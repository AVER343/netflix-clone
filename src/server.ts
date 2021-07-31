import express, { Express,Router } from 'express'
import { Pool } from 'pg';
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import Bull from 'bull'
import pool from './db/database-connection';
import { BULL_QUEUES } from './services';
// import { job } from './interfaces/user';
import { sendMail } from './utils/send_email';
import Redis ,{RedisClient as redisType} from 'redis'
import { QUEUES, QUEUE_TYPE } from './services/bull/utils/queue-names';
// import { insert_API_Names, insert_ROLES } from './utils/insertToDb';
// import { API_NAMES } from './utils/roles';
// import { QUEUE_NAME } from './services/bull/utils/queue-names';
class Server{
    private app:Express|undefined;
    static PORT:number;
    static pool:Pool= pool;
    static RedisClient:redisType=new (Redis.createClient as any)({
        port:6379,
        host:'redis-server'
    })
    constructor(PORT:number)
        {
            Server.pool = pool;
            (async()=>{
                this.app = express()
                this.insertToDb()
                this.confiureServices()
                this.configureServer()
                this.startServices()
                this.setRoles()
            })()
            Server.PORT = PORT
        }
    public useRoutes(router:Router){
        this.app!.use(router)
    }
    private async setRoles(){

    }
    public start(){
        this.app!.listen(Server.PORT,()=>{
            console.log(`Server running at ${Server.PORT}`)
        })
    }
    private configureServer(){
        this.app!.use(express.json())
        this.app!.use(express.urlencoded({extended:true}))
        this.app!.use(cookieParser())
        this.app!.use(cors({credentials:true,origin:true}))
        this.app!.use(function(req:any, res:any, next:any) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Credentials', `true`);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            })
    }
    private confiureServices(){
        new BULL_QUEUES()
    }
    private async startServices(){
        //add types to database
       await Promise.all(QUEUES.map(e=>{
                Server.pool.query('INSERT INTO QUEUE_TYPES("type",priority) VALUES($1,$2);',
                        [e.queue_name,e.queue_priority]).catch(e=>{})
            }))
        //setup listeners for corresponding types
        BULL_QUEUES.listener(QUEUE_TYPE.SEND_EMAIL_HIGH_PRIORITY,async(job:any)=>{
            const data:{email:string} = job.data
            await sendMail(data,{subject:'',text:`<h1>MY NAME</h1>`})
        })
        BULL_QUEUES.completion(QUEUE_TYPE.SEND_EMAIL_HIGH_PRIORITY,async(job)=>{
          try{
            await Server.pool.query('BEGIN')
            await  Server.pool.query(`UPDATE JOB_TABLE 
                                      SET completed = true and completed_on = now() 
                                      where id =$1::bigint`
                                ,[job.id])
            await  Server.pool.query('DELETE FROM QUEUE_ACTIVE where id =$1::bigint',[job.id])
            await Server.pool.query('COMMIT')
            await job.remove()
          }
          catch(e){
              console.log(e)
          }
        })
    }
    private  async insertToDb(){
        // insert_API_Names()
        // insert_ROLES()
    }
}
export default Server