import React from 'react'
import SingleAlert from './single-alert'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { ROUTES } from '../../Shared/Constants'
import {Link as ChakraLink} from '@chakra-ui/react'
import Link from 'next/link'
const TopNavAlertComponent=()=>{
    let [session,loading]:any = useSession()
    let router = useRouter()
    return <>
            {!loading && session && !session.user['user_verified'] &&
            <SingleAlert closable={false} marginLeft='auto' marginRight='auto' status="error">
                User email has not yet been verified ! 
                <Link href={ROUTES.ACCOUNT_VERIFICATION}>
                    <b style={{marginLeft:'1rem'}}>
                        <ChakraLink color='var(--text-primary)'> Verify now !</ChakraLink>
                    </b>
                </Link>
            </SingleAlert>
            }
        </>
}
export default TopNavAlertComponent