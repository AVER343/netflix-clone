export const hasKey = (obj:any,key:string)=>{
    return obj && obj[key]
}
import {Request} from 'express';
import { User_Interface } from '../interfaces/user';

export interface RequestCustom extends Request
{
    __API_NAME__: string;
    user?:User_Interface;
}
export const randomNumber=(numberOfDigits:number)=>{
    let toChooseFrom= '0123456789'
    let number=''
    for(let i=0;i<numberOfDigits;i++)
    {
        number= number.concat(toChooseFrom[Math.floor(Math.random()*10)])
    }
    return number
}
