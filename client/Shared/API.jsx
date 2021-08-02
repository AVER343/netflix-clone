import {APIHostFromClient,APIHostFromServer} from './Constants'
import axios from 'axios'
class APIRequests{
        constructor(){
           this.APIRequestsFromClient= axios.create({
                   baseURL:APIHostFromClient
        })
        this.userSignUp = (config)=>this.APIRequestsFromClient.post('/users/signup',config)
        }
    
}
export default new APIRequests() 
