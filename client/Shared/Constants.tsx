let stagingAPIHostFromServer = 'http://localhost:4200'
let stagingAPIHostFromClient = 'http://localhost:4200'
let stagingClientHost = 'http://localhost:3000'
let APIHostFromServer=stagingAPIHostFromServer
let APIHostFromClient=stagingAPIHostFromClient

let ClientHost = stagingClientHost
const OTP_LENGTH=5
const ROUTES = {
    LOGIN:'/login',
    SIGNUP:'/signup',
    HOMEPAGE:'/',
    ACCOUNT_VERIFICATION:'/account/verify',
    SELECT:'/select'
}


export {APIHostFromServer,APIHostFromClient,ClientHost,ROUTES,OTP_LENGTH}