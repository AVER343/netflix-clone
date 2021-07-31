// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import {ColorModeProvider,Button} from '@chakra-ui/react'
import { useSession} from 'next-auth/client'
import HeaderComponent from '../components/header/index'
// import App from '../components/header/index'
export default function Home(props:any) {
  const [session,loading]=useSession() 
  return (<div>
             {JSON.stringify(session)}
          </div>
  )
}
