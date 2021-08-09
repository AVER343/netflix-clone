import express from 'express'
import PostContent from './content/postContent'
import GetContent from './content/getContent'
const UserRouter = express.Router()

UserRouter.all('/content/*',PostContent)
UserRouter.all('/content/*',GetContent)

export default UserRouter
