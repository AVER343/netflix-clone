import express ,{Request,Response} from 'express'
import {body,validationResult} from 'express-validator'
// import set_API_NAME from '../../../middleware/setAPIName_checkpermission'
import User from '../../../orm/user'
// import { BULL_QUEUES } from '../../../services'
import HandleResponse, { Messages } from '../../../utils/handleResponse'
// import { API_NAMES } from '../../../utils/roles'
const Signup = express.Router()
Signup.post('*/signup',
        body('email').isEmail().withMessage(('Invalid email !')),
        body('password').isLength({min:5}).withMessage(('Invalid password !')),
        body('username').isLength({min:1}).withMessage(('Invalid Unique email !')),
        body('confirm_password').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password');
            }
            return true;
          }),
        async(req:Request,res:Response)=>{
           try{
                let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),{type:'error',statusCode:400})
                }
                let user  =await User.findOne(req.body)
                if(user)
                {
                  if(user.getUser().email==req.body.email)
                  {
                    return HandleResponse(res,Messages.EMAIL_ALREADY_IN_USE,{type:'error',statusCode:400})
                  }
                  if(user.getUser().username==req.body.username)
                  {
                    return HandleResponse(res,Messages.USERNAME_TAKEN,{type:'error',statusCode:400})
                  }
                }
                //user doesnt exist ,then save (creates new)
                let new_user = new User(req.body)
                await new_user.save()
                let OTP = await new_user.getOTP(req.body.email!)
                User.sendEmail({email:req.body.email,OTP:OTP},undefined,new_user.getUser().id)
            return HandleResponse(res,Messages.SIGNED_UP,{type:'success',statusCode:201})
           }
           catch(e:any){
             console.log(e)
            return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
           }
    })
    export default Signup