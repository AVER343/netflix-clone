import jwt from 'jsonwebtoken'
import HandleResponse, { Messages } from '../utils/handleResponse'
import User from '../orm/user'
import { hasKey} from '../utils/utisl'
import Server from '../server'
const DEFAULT_CACHING_SECONDS=60*15
let authentication =async(req:any,res:any,next:any)=>{
   try{
    if(!req.cookies.JWT && !req.headers['Authorization'])
    {
         return HandleResponse(res,Messages.UNAUTHENTICATED,{type:'error',statusCode:400})
    }
     const JWT = req.cookies.JWT || req.headers['Authorization'].split('Bearer ')[1]
     let verified_user = await jwt.verify(JWT,`process.env.JWT_SECRET`)
        if(!verified_user)
            {
                throw new Error('Verification failed . Please login again.')
            }
        let user:any
        if(!hasKey(verified_user,'email'))
            {
                throw new Error('User does not exist !')
            }
       Server.RedisClient.get(hasKey(verified_user,'email'),async(err,res)=>{
            if(err)
            {
                throw new Error('Verification failed . Please login again.')
            }
            if(res)
            {
                console.log('hitting cache')
                user=JSON.parse(res)
            }
            else{
                console.log('NOT hitting cache')
                user = await User.findOne({email:hasKey(verified_user,'email')})
                if(!user)
                    {
                        throw new Error('User does not exist !')
                    }
                if(!user.getUser()['user_verified'])
                    {
                        throw new Error('User has not yet been verified !')
                    }
            Server.RedisClient.SETEX(hasKey(verified_user,'email'),DEFAULT_CACHING_SECONDS,JSON.stringify(user.getUser()),)
            user = user.getUser()
            }
            req.user = user
            return next()
        })
     
   }
   catch(e:any)
   {
      return HandleResponse(res,e.message,{type:'error',statusCode:400})
   }
}
export default authentication