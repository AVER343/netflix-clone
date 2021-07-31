export interface message{
    message:string;
    type:ResponseType
}
export type ResponseType =  "error" | "success" | "info" | (string & {}) ;
 