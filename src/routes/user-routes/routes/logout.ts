import express ,{Request,Response} from 'express'
// import set_API_NAME from '../../../middleware/setAPIName_checkpermission'
import HandleResponse, { Messages } from '../../../utils/handleResponse'
// import { API_NAMES } from '../../../utils/roles'
const Logout = express.Router()
Logout.post('*/logout',
        // set_API_NAME(API_NAMES.LOGOUT),
        async(req:Request,res:Response)=>{
           try{
               await res.clearCookie('JWT')
              return HandleResponse(res,Messages.LOGGED_OUT,{type:'success',statusCode:200})
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
        }
    })
    export default Logout