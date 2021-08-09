import '../styles/globals.css' 
import {GlobalStyles} from '../styles/global-styles' 
import '../styles/header.css' 
import 'normalize.css'
import {JumboTronContainer,Header} from '../containers'
import type { AppProps } from 'next/app'
import { ChakraProvider,Alert,AlertIcon, extendTheme } from '@chakra-ui/react'
// import HeaderComponent from '../components'
import { getSession, Provider, useSession } from "next-auth/client"
import { CheckAuthPage } from '../components'
import {TopNavAlertComponent} from '../components'
import { APIHostFromClient } from '../Shared/Constants'
import { useEffect } from 'react'
import API from '../Shared/API'
const theme = extendTheme({
  config: {
    initialColorMode:'dark'
  },
})
function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
          <Provider session={pageProps.session}>
                <GlobalStyles/>
                  <CheckAuthPage user={pageProps.session}>
                     <TopNavAlertComponent/>
                        <Component {...pageProps} />
                  </CheckAuthPage>
          </Provider>
        </ChakraProvider>
}
export async function getServerSideProps(context){
  const session =await getSession(context)
  return {
    props:{session}
  }
}


export default MyApp
