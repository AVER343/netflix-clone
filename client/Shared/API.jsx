import {APIHostFromClient,APIHostFromServer} from './Constants'
import axios from 'axios'
class APIRequests{
        constructor(){
           this.APIRequestsFromClient= axios.create({
                   baseURL:APIHostFromClient,
                   withCredentials:true
        })
        this.APIRequestsFromServer= axios.create({
                baseURL:APIHostFromServer,
                withCredentials:true
        })
     ////CLient Side
     this.userSignUp = (config)=>this.APIRequestsFromClient.post('/users/signup',config)  
     this.verifyAccount = (config)=>this.APIRequestsFromClient.post('/users/otp/verify/account',config) 
     this.generateOTP = (config)=>this.APIRequestsFromClient.get('/users/otp/generate',config) 
     this.getContentFromClient = (param,config)=>this.APIRequestsFromClient.get(`/content/`+param,{headers:config})
     
     ///////ServerSide
     this.userSignIn = (config)=>this.APIRequestsFromServer.post(`/users/login`,config)
     this.getContentFomServer = (param,config)=>this.APIRequestsFromServer.get(`/content/`+param,{headers:config})
    
}
}
export default new APIRequests()
