import '../styles/globals.css' 
import '../styles/header.css' 
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
import HeaderComponent from '../components/header'
import { Provider } from "next-auth/client"
function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
          <Provider session={pageProps.session}>
                <HeaderComponent/>
              <Component {...pageProps} />
          </Provider>
        </ChakraProvider>
}
export default MyApp
