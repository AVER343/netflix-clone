
import { ClientHost, OTP_LENGTH, ROUTES} from '../../../Shared/Constants'
import { getSession, signin, signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState,useContext, useRef } from 'react'
const VARIANT_COLOR = 'teal'
import {Center,Grid,useToast} from '@chakra-ui/react'
import { Form ,CustomToast} from '../../../components';
import { Header,Footer } from '../../../containers';
import API from '../../../Shared/API'
export default function SignIn(props) {
  let toast =useToast()
  const [OTP, setOTP] = useState([]);
  const [OTP_sent, setOTP_sent] = useState(false);
  const [session,loading]=useSession()
  const [error, setError] = useState('');
  const [email, setEmailAddress] = useState('');
  let router = useRouter()
  useEffect(()=>{},[JSON.stringify(OTP)])
  const isInvalid = OTP.filter(e=>e==''||e==undefined).length!=0
  let ref =Array(OTP_LENGTH).map(e=>useRef())
  const submitChange=async ({target},i)=>
    {
        if(!(target.value>=0 && target.value<=9))return
        let new_OTP = [...OTP]
            new_OTP[i]=target.value[0]
        await setOTP(new_OTP)
        if(target.value[0] && target.nextSibling)target.nextSibling.focus();         
}
  return (
    <>
     <Header>
        <Form style={{maxWidth:'450px',minHeight:!OTP_sent?'500px':'660px'}}>
          <Center><Form.Title>Verify account</Form.Title></Center>
          {error && <Form.Error data-testid="error">{error}</Form.Error>}
          <Form.Input
              placeholder="Email address"
              value={session?.user?.email}
              disabled={true}
            />
            <Grid templateColumns="repeat(6, 1fr)" gap={3}>
                {(new Array(OTP_LENGTH)).fill(0)
                    .map((e,i)=><Form.OTPInput
                                    ref = {ref[i]} 
                                  value={OTP[i]||''}
                                  textAlign='center'
                                  onChange={(e)=>submitChange(e,i)}/>)}
            </Grid>
            <Form.Submit 
            onClick={async()=>{
              await API.verifyAccount({email:session?.user?.email.toLowerCase(),otp:OTP.join('')});
              await signOut()
              toast({
                title: "Account verified.",
                description:'Account successfully verified !',
                render:()=>(<CustomToast>{'Account verified! Login again to continue .'}</CustomToast>),
                duration: 5000,
                isClosable: true,
              })
            }}
            disabled={isInvalid} 
            data-testid="sign-in">
                Verify now
            </Form.Submit>
          <Form.Text>
             Forgot Password? 
            <br/>
          <Form.Link onClick={()=>{

          }}>
            {`Verify now`}
            </Form.Link>
          </Form.Text>
          <Form.TextSmall color="red" onClick={async()=>{
        await API.generateOTP({headers:{email:session.user.email}})
        }}>
            Resend OTP
          </Form.TextSmall>
        </Form>
     </Header>
    </>
  );
}
export async function getServerSideProps(context){
    let session =await getSession(context)
    return {props:{session}}
}