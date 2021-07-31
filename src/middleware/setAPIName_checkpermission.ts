import { Response , NextFunction} from "express";
import Server from "../server";
import HandleResponse, { Messages } from "../utils/handleResponse";
// import Server from "../server";
// import HandleResponse from "../utils/handleResponse";
import { API_NAMES } from "../utils/roles";
// import { RequestCustom } from "../utils/utisl";
const hasPermission=async (ROLE_TYPE_ID:string|undefined,API_NAME:API_NAMES,user_id:string|undefined)=>{
    let args = [ROLE_TYPE_ID,API_NAME]
    if(user_id) args.push(user_id)
    if(!ROLE_TYPE_ID) return false
    let result =await Server.pool
        .query(`SELECT 'selected_role' as role FROM ROLE_PERMISSIONS_API  RPA
                JOIN USER_ROLE_TYPE  URT ON URT.id = RPA.role_type
                JOIN API_NAMES AP ON AP.id = RPA.api_id
                WHERE URT.id = $1 and AP.api_name = $2
                ${user_id?`UNION ALL
                SELECT 'special_role' as role from SPECIAL_PERMISSIONS  SP
                JOIN API_NAMES AP ON AP.id = SP.api_id
                WHERE user_id = $3 and AP.api_name = $2`:''} ;
        `,args)
    console.log(result.rows,args)
    let permission_given = result.rowCount>0
           
    return permission_given
}
const set_API_NAME=(api_name:API_NAMES)=>{
    return async(req:any,res:Response,next:NextFunction) =>{
            req['__API_NAME__'] = api_name
           const has_permission = await hasPermission(req.user?.user_role_type_id,api_name,req.user?.id)
           if(!has_permission)
           {
               return HandleResponse(res,Messages.UNAUTHORIZED,{type:'error',statusCode:400})
           }
           return next();
        }
}
export default set_API_NAME
