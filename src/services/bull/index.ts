import Bull,{Queue} from 'bull'
// import { job } from '../../interfaces/user';
// import  nodemailer  from 'nodemailer'
import { QUEUE_TYPE} from './utils/queue-names'
class QUEUES{
    //todo redis_que interface
    static REDIS_QUEUE:{[id:string]:Queue}
    constructor(){
          //created new Redis publishers
        this.createQueues()
    }
    private async createQueues(){
        let keys = Object.keys(QUEUE_TYPE);
        QUEUES.REDIS_QUEUE ={}
        keys.forEach((elem:string)=>QUEUES.REDIS_QUEUE[elem]= new Bull(elem, {
            redis: {
              host: 'localhost',
              port:6379
            }
          }))
          for(let queues in QUEUES.REDIS_QUEUE)
          {
            await QUEUES.REDIS_QUEUE[queues].clean(1)
          }
    }
    static async listener(queue_name:QUEUE_TYPE,callback:(job:any)=>void){
        QUEUES.REDIS_QUEUE[queue_name].process(callback);
    }
    static async completion(queue_name:QUEUE_TYPE,callback:Bull.CompletedEventCallback){
        QUEUES.REDIS_QUEUE[queue_name].on('completed',callback);
    }
    static async publisher(queue_name:QUEUE_TYPE,data:any,options:Bull.JobOptions){
        QUEUES.REDIS_QUEUE[queue_name].add(data,{attempts:5,backoff:5000,...options})
    }
}
export default QUEUES