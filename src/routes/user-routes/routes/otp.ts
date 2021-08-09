import express ,{Request,Response} from 'express'
import {body, header,validationResult} from 'express-validator'
import authentication from '../../../middleware/auth'
import set_API_NAME from '../../../middleware/setAPIName_checkpermission'
import User from '../../../orm/user'
import Server from '../../../server'
// import Server from '../../../server'
import HandleResponse, { Messages } from '../../../utils/handleResponse'
import { API_NAMES } from '../../../utils/roles'
import { hasKey } from '../../../utils/utisl'

const OTP = express.Router()
OTP.post('/update',
     set_API_NAME(API_NAMES.POST_UPDATE_OTP),
     body('email').isEmail().withMessage(('Invalid email !')),
     body('otp').isLength({min:1}).withMessage(('Invalid OTP !')),
        async(req:Request,res:Response)=>{
           try{
                let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),{type:'error',statusCode:400})
                }
                let otp = hasKey(req.body,'otp')
                let email = hasKey(req.body,'email').toLowerCase()
                let user  = await User.findOne({email})
                if(!user)
                {
                    return HandleResponse(res,Messages.USER_NOT_EXIST,{type:'error',statusCode:400})
                }
               const isRightOTP = await user.isCorrectOTP(otp)
               if(!isRightOTP)
               {
                    return HandleResponse(res,Messages.WRONG_OR_EXPIRED_OTP,{type:'error',statusCode:400})
               }
              return HandleResponse(res,Messages.USER_UPDATED_USING_OTP,{type:'success',statusCode:200})
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
        }
    })
OTP.get('/generate',
    authentication,
    header('email').isEmail().withMessage(('Invalid email !')),
       async(req:Request,res:Response)=>{
          try{
               let result = validationResult(req)
               if(!result.isEmpty())
               {
                   return HandleResponse(res,result.array(),{type:'error',statusCode:400})
               }
               let email = hasKey(req.headers,'email').toLowerCase()
               let user  = await User.findOne({email})
               if(!user)
               {
                   return HandleResponse(res,Messages.USER_NOT_EXIST,{type:'error',statusCode:400})
               }
              let OTP = await user.getOTP(email)
              console.log(OTP)
              await User.sendEmail({email,OTP},undefined,user.getUser().id)
             return HandleResponse(res,Messages.OTP_SENT,{type:'success',statusCode:200})
          }
          catch(e:any){
           return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
       }
})

OTP.post('/verify/account',
     body('email').isEmail().withMessage(('Invalid email !')),
     body('otp').isLength({min:1}).withMessage(('Invalid OTP !')),
        async(req:Request,res:Response)=>{
           try{
            let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),{type:'error',statusCode:400})
                }
                let otp = hasKey(req.body,'otp')
                let email = hasKey(req.body,'email').toLowerCase()
                let user  = await User.findOne({email})
                if(!user)
                {
                    return HandleResponse(res,Messages.USER_NOT_EXIST,{type:'error',statusCode:400})
                }
                if(user.getUser().user_verified)
                {
                    return HandleResponse(res,Messages.USER_VERIFIED,{type:'success',statusCode:200})
                }
               const isRightOTP = await user.isCorrectOTP(otp)
               if(!isRightOTP)
               {
                    return HandleResponse(res,Messages.WRONG_OR_EXPIRED_OTP,{type:'error',statusCode:400})
               }
               user.getUser().user_verified = true
              await user.save()
              await Server.pool.query('UPDATE USERS SET user_verified = true WHERE id = $1',[user.getUser().id])
              const JWT  = await user.setJWT()
              return res.cookie('JWT',JWT,{maxAge:120*60*1000}).send(user.getUser())
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
        }
    })
    export default OTP