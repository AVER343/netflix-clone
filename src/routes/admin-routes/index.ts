import express from 'express'
import Roles from './routes/roles'
// import hasPermission from '../../middleware/permission'


const AdminRouter = express.Router()

AdminRouter.all('*/roles',Roles)
// AdminRouter.all('*/signup',Signup)
// AdminRouter.all('*/me',Me)
// AdminRouter.all('*/logout',Logout)


export default AdminRouter
