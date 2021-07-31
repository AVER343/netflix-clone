
import {
    ThemeProvider,
    theme,
    ColorModeProvider,
    CSSReset,
    Box,
    Flex,
    IconButton,
    useColorMode,
    Heading,
    Text,
    Link,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Checkbox,
    Button
  } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
const VARIANT_COLOR = 'teal'

const LoginArea = () => {
  const [session,loading]= useSession()
  const router = useRouter()
  useEffect(()=>{
  },[session,router])
  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
      <Box 
        borderWidth={1}
        px={4}
        width='full'
        maxWidth='500px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'
      >
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  )
}
const LoginHeader = () => {
    return (
      <Box textAlign='center'>
        <Heading>Sign In to Your Account</Heading>
        <Text>
          Or <Link color={`${VARIANT_COLOR}.500`}>start your 14 days trial</Link>
        </Text>
      </Box>
    )
  }
  
  const LoginForm = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return (
      <Box my={8} textAlign='left'>
        <form>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input value={email} type='email' onChange={e=>setEmail(e.target.value)}  placeholder='Enter your email address' />
          </FormControl>
  
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input value={password} onChange={e=>setPassword(e.target.value)} type='password' placeholder='Enter your password' />
          </FormControl>
  
          <Stack isInline justifyContent='space-between' mt={4}>
              <Box>
                <Checkbox>Remember Me</Checkbox>
              </Box>
              <Box>
                <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
              </Box>
          </Stack>
  
          <Button className={'important-success-button'} 
          outline={0} width='full' mt={4}
          onClick={async()=>{
            await signIn('credentials',{email,password,callbackUrl: 'http://localhost:3000' })
          }}>
            Sign In</Button>
        </form>
      </Box>
    )
  }
  export default LoginArea