import Server from "../server"
import { API_NAMES, ROLES } from "./roles"
//inserted on instace start
export const insert_API_Names =async ()=>{
    let promises = []
    await  Server.pool.query('DELETE FROM API_NAMES;')
    promises = Object.values(API_NAMES).map((e,i)=>{
        Server.pool.query('INSERT INTO API_NAMES(id,api_name) VALUES($1,$2);',[i+1,e])
    })
    await Promise.all(promises)
    console.log({API_NAMES_INFO:`${promises.length} api names added !`})
}
export const insert_ROLES = async ()=>{
    let promises = []
    await  Server.pool.query('DELETE FROM USER_ROLE_TYPE;')
    promises = Object.values(ROLES).map((e,i)=>{
        Server.pool.query('INSERT INTO USER_ROLE_TYPE(id,user_role) VALUES($1,$2);',[i+1,e])
    })
    console.log({ROLES_INFO : `${promises.length} roles added !`})
    await Promise.all(promises)
}