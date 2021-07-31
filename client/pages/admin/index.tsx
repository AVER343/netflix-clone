import axios from "axios"
import { getSession } from "next-auth/client"
import API_FUNCTION from "../../src/api"

const AdminPage=(props:any)=>{
    return (<div>
      {JSON.stringify(props)}
    </div>)
}
export default AdminPage
export async function getServerSideProps({req,res}:any) {
  let roles:any=null
      try{
        roles =(await API_FUNCTION(req)).get('/admin/roles')
        roles =roles.data.rows
      }
      catch(e:any){
        console.log({e})
      }
    return {
      props: {roles}, // will be passed to the page component as props
    }
  }