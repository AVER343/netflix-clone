import '../styles/globals.css' 
import {GlobalStyles} from '../styles/global-styles' 
import '../styles/header.css' 
import 'normalize.css'
import {JumboTronContainer,Header} from '../containers'
import type { AppProps } from 'next/app'
import { extendTheme } from "@chakra-ui/react"
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })
import { ChakraProvider } from '@chakra-ui/react'
// import HeaderComponent from '../components'
import { Provider } from "next-auth/client"
function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
          <Provider session={pageProps.session}>
                <GlobalStyles/>
              <Component {...pageProps} />
          </Provider>
        </ChakraProvider>
}
export default MyApp
