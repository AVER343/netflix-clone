let stagingAPIHostFromServer = 'http://node-app:4200'
let stagingAPIHostFromClient = 'http://localhost:4200'
let stagingClientHost = 'http://localhost:3000'
let APIHostFromServer=stagingAPIHostFromServer
let APIHostFromClient=stagingAPIHostFromClient

let ClientHost = stagingClientHost

const ROUTES = {
    LOGIN:'/login',
    SIGNUP:'/signup',
    HOMEPAGE:'/'
}


export {APIHostFromServer,APIHostFromClient,ClientHost,ROUTES}