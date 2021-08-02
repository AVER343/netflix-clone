
import { ClientHost, ROUTES} from '../../Shared/Constants'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState,useContext } from 'react'
const VARIANT_COLOR = 'teal'
import { Form } from '../../components';
import { Header,Footer } from '../../containers';
export default function SignIn() {
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let router = useRouter()
  useEffect(()=>{
    setError(decodeURI(router.asPath.split('error=')[1]||''))
  },[])
  const isInvalid = password === '' || email === '';

  const handleSignin = async (event) => {
    event.preventDefault();
    setError('')
    await signIn('credentials',{email,password,callbackUrl:ClientHost})
  };

  return (
    <>
      <Header>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error data-testid="error">{error}</Form.Error>}

          <Form.Base onSubmit={handleSignin} method="POST">
            <Form.Input
              placeholder="Email address"
              value={email}
              onChange={({ target }) =>setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) =>setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit" data-testid="sign-in">
              Sign In
            </Form.Submit>
          </Form.Base>

          <Form.Text>
             New to Netflix? 
            <br/>
          <Form.Link onClick={()=>router.push(ROUTES.SIGNUP)}>
            {` Sign up now.`}
            </Form.Link>
          </Form.Text>
          {/* <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall> */}
        </Form>
      </Header>
      <Footer/>
    </>
  );
}
