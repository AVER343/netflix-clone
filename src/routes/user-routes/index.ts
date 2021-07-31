import express from 'express'
// import hasPermission from '../../middleware/permission'
import Login from './routes/login'
import Logout from './routes/logout'
import Me from './routes/me'
import OTP from './routes/otp'
// import OTP from './routes/otp'
import Signup from './routes/signup'

const UserRouter = express.Router()

UserRouter.all('*/login',Login)
UserRouter.all('*/signup',Signup)
UserRouter.all('*/me',Me)
UserRouter.all('*/logout',Logout)
UserRouter.use('*/otp',OTP)


export default UserRouter
