import express from 'express'
import AdminRouter from './admin-routes'
// import DocumentationRouter from './documentation-routes'
import UserRouter from './user-routes'
import HandleResponse, { Messages } from '../utils/handleResponse'
const RouterConfig = express.Router()

RouterConfig.all('/users/*',UserRouter)
RouterConfig.all('/admin/*',AdminRouter)
// RouterConfig.all('/documentation/*',DocumentationRouter)
RouterConfig.all('/*',(req,res)=>{
    return HandleResponse(res,Messages.ROUTE_NOT_FOUND,{type:'error',statusCode:404})
})
export default RouterConfig