import Server from "../server";

class Content{

    static pool = Server.pool;
    constructor(){

    }
    static async get_Content(user_id:any,filters:any){
            try{
                let query = 'SELECT * FROM CONTENT_TABLE CT '
                let args:any=[]
                // if(user_id){
    
                // }
                console.log({filters})
                if(filters.category){
                    if(query.indexOf('WHERE')==-1)
                    {
                        query = query + ' WHERE '
                    }
                    else{
                        query=query + ' and '
                    }
                    args.push(filters.category)
                    query = query + `CT.data->>'type'= $${args.length}`
                }
                if(filters.searchterm){
                    if(query.indexOf('WHERE')==-1)
                    {
                        query = query + ' WHERE '
                    }
                    else{
                        query=query + ' and '
                    }
                    args.push(`${filters.searchterm}`)
                    query = query + ` ( LOWER(CT.data->>'title') like LOWER('%'||$${args.length}||'%' ) )`
                                        // or LOWER(CT.data->>'description') like LOWER('%'||$${args.length}||'%'))`
                }
                //for preferences
                // if(user_id)
                // {
                //     query = query = ' WHERE '
                // }
                //
                // if(args.length==0 && filters.length>0){
                //         query = query + ' WHERE '
                //         filters.map((e,i)=>{
                //            if(i==filters.length-1)
                //             query = query + ` CT.data->>'${i+1}'=${2} ,`
                //             else  query = query + ` CT.data->>'${i+1}'`
                //             args.push(e)
                //         })
                // }
                console.log({query,args})
                let response = await Content.pool.query(query,args);
                return response.rows
            }
            catch(e){
                console.log({e})
            }   
    }
}
export default Content