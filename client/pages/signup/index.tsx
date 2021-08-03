import { ROUTES} from '../../Shared/Constants'
import { useRouter } from 'next/dist/client/router'
import APIRequests from '../../Shared/API'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import './signup.module.css'
import {useToast} from '@chakra-ui/react'
import { CustomToast, Form } from '../../components';
import { Header,Footer } from '../../containers';
import { signIn } from 'next-auth/client';
export default function SignIn() {
  const [error, setError] = useState<String|null>(null);
  let router = useRouter()
  let toast  = useToast()
  const toastIdRef:any = React.useRef()
  const isInvalid = false;  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data:any)=> {
    try{
      let res = await APIRequests.userSignUp(data)
      if(res.status==201)
      {
          setError('')
          toastIdRef.current = toast({
                  title: "Account created.",
                  description: res?.data?.messages?.[0]?.['message']||`Account successfully created`,
                  render:()=>(<CustomToast onClose={()=>toast.close(toastIdRef.current)}>{res?.data?.messages?.[0]?.['message']||'Account successfully created'}</CustomToast>),
                  duration: 9000,
                  isClosable: true,
                })
          signIn('credentials',data)
          router.push(ROUTES.HOMEPAGE)
      }
    }
    catch(e:any){
      if(e?.response)
      {
        if(e?.response?.data?.messages)
        {
          setError(e.response.data.messages[0]['message'])
        }
      }
  } 
  }


  return (
    <>
      <Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error data-testid="error">{error}</Form.Error>}
          
          <Form.Base method="POST">
            <Form.Input
                 {...register("username",{required:true})}
                 placeholder='Username'
              />
            <Form.Input
              autoComplete="off"
              placeholder="Email"
              {...register("email",{required:true})}
            />
            <Form.Input
              type="password"
              autoComplete="off"
              placeholder="Password"
              {...register("password",{required:true})}
            />
             <Form.Input
                 type="password"
                 autoComplete="off"
                 placeholder="Confirm Password"
                 {...register("confirm_password",{required:true})}
              />

            <Form.Submit disabled={isInvalid} type="submit" data-testid="sign-in">
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
             Already have an account? 
            <br/>
          <Form.Link onClick={()=>router.push(ROUTES.LOGIN)}>
            {` Login now.`}
            </Form.Link>
          </Form.Text>
        </Form>
      </Header>
      <Footer/>
    </>
  );
}
