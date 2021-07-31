import constants from './Constants'
import axios from 'axios'
class APIRequests{
        constructor(){

        }
    NodeServeAPI = axios.create({
        baseURL:constants.APIHost
    })
}
export default APIRequests