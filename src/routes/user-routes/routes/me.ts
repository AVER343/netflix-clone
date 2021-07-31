import express ,{NextFunction, Response} from 'express'
import authentication from '../../../middleware/auth'
import set_API_NAME from '../../../middleware/setAPIName_checkpermission'
import User from '../../../orm/user'
import HandleResponse from '../../../utils/handleResponse'
import { API_NAMES } from '../../../utils/roles'
const Me = express.Router()
Me.post('*/me',
          authentication,
          set_API_NAME(API_NAMES.ME),
        async(req:any,res:Response,Next:NextFunction)=>{
           try{ 
                let user = new User(req.user)
                return res.send(user.getUser())
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
           }
    })
    export default Me