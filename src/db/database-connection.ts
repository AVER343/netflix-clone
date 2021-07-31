import { PoolClient,PoolConfig, QueryResult } from "pg";
import {Pool} from 'pg'
// import {parse} from 'pg-connection-string'
let config:PoolConfig
config = {
  database:'postgres',
  password:'postgres',
  user:'postgres',
  host:'postgres-server'
}
// if(process.env.NODE_ENV=='production')
//     {
//         config = parse(process.env.DATABASE_URL!)
//         config.ssl = {
//             rejectUnauthorized: false
//         }
//    }

const databaseConnection = config
const pool = new Pool(databaseConnection)
pool.connect((err:Error, client:PoolClient, release:any) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW() as now', async(err:Error, result:QueryResult) => {
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.error('CONNECTION SUCCESSFUL at '+result.rows[0].now)
    })
  })
export default pool
