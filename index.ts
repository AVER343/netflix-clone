import RouterConfig from "./src/routes";
import Server from "./src/server";
let server  = new Server(4200)
require('dotenv').config()
server.useRoutes(RouterConfig)
server.start()