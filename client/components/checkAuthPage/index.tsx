import {Alert,AlertIcon,AlertTitle,AlertDescription,CloseButton} from '@chakra-ui/react'
import {useSession,getSession} from 'next-auth/client'
import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from '../../Shared/Constants';
const CheckAuthPage=(props:any)=>{
    const router = useRouter()
    const [session,isLoading]=useSession()
    let UNAUTHORIZED_LINKS_ONLY=[ROUTES.LOGIN,ROUTES.SIGNUP,ROUTES.HOMEPAGE]
    let AUTHORIZED_LINKS_ONLY:string[]=[ROUTES.ACCOUNT_VERIFICATION]
    let AUTHENTICATED_AND_UNAUTHORIZED_ONLY = 
                        !isLoading && session && UNAUTHORIZED_LINKS_ONLY.includes(router.asPath)
    let UNAUTHENTICATED_AND_AUTHORIZED_ONLY =   
                    isLoading && !session && AUTHORIZED_LINKS_ONLY.includes(router.asPath)
    useEffect(()=>{
            if(AUTHENTICATED_AND_UNAUTHORIZED_ONLY){
                router.push('/browse');
            }
        if(UNAUTHENTICATED_AND_AUTHORIZED_ONLY){
                router.push(ROUTES.LOGIN);
            }                
    },[router.asPath,isLoading])
    return <>
        {
            isLoading
            ?<div>asdasd</div>
            :props.children
        }
        </>
}
export default CheckAuthPage