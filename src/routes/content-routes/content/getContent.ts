
import express from 'express'
// import {body,validationResult} from 'express-validator'
// import pool from '../../../db/database-connection'
import ContentClass from '../../../orm/content'
// import HandleResponse, { Messages } from '../../../utils/handleResponse'
const Content = express.Router()
Content.get('*/:user_id',
        async(req,res)=>{
        try{
            let {category,searchterm}:any=req.headers;
            let contents =await ContentClass.get_Content(null,{category,searchterm})
            res.send(contents)
        }
        catch(e){

        }
})

export default Content