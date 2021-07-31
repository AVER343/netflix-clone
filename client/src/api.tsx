import axios from 'axios'
import { getSession } from 'next-auth/client';
const API_CLIENT_BASE_ADDRESS = 'http://localhost:4200';
const API_SERVER_BASE_ADDRESS = 'http://node-app:4200';
axios.defaults.withCredentials = true;
const API_FUNCTION=async(req:any)=>{
    let session:any =await getSession({req})
    console.log(session.user.jwt)
    if(typeof window!=='undefined')
    {
     return axios.create({
            baseURL:API_CLIENT_BASE_ADDRESS,
            headers:{'Authorization':`Bearer ${session.user.jwt}`}
        }) 
    }
    return  axios.create({
        baseURL:API_SERVER_BASE_ADDRESS ,
        headers:{'Authorization':`Bearer ${session.user.jwt}`}
    })   
}
export default API_FUNCTION