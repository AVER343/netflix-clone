
import express ,{Request,Response} from 'express'
import {body,validationResult} from 'express-validator'
import pool from '../../../db/database-connection'
import User from '../../../orm/user'
import HandleResponse, { Messages } from '../../../utils/handleResponse'
// import { ROLES } from '../../../utils/roles'
import bcrypt from 'bcryptjs'
const Login = express.Router()
Login.post('*/login',
        body('email').isEmail().withMessage(('Invalid email !')),
        body('password').isLength({min:5}).withMessage(('Invalid password !')),
        async(req:Request,res:Response)=>{
           try{
                let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),{type:'error',statusCode:400})
                }
                let user  = (await User.findOne(req.body))
                if(!user)
                {
                    return HandleResponse(res,Messages.USER_NOT_EXIST,{type:'error',statusCode:400})
                }
                if(!user.getUser()['user_verified'])
                {
                    return HandleResponse(res,Messages.EMAIL_NOT_VERIFIED,{type:'error',statusCode:400})
                }
                console.log({id:user.getUser().id})
                const Us_u =await pool.query('SELECT * FROM USERS WHERE id = $1;',[user.getUser().id]) 
                const isCorrectPassword = await bcrypt.compare(req.body.password,Us_u.rows[0]['password'])
                console.log({isCorrectPassword})
                if(!isCorrectPassword)
                {
                    return HandleResponse(res,Messages.INCORRECT_PASSWOD,{type:'error',statusCode:400})
                }
                let JWT = await user.setJWT()
                // console.log()
              return res.cookie('JWT',JWT,{maxAge:120*60*1000}).send(user.getUser())
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
        }
    })
    export default Login