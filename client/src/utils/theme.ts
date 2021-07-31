import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: {
    Button: {
      // Change default color
      variants: {
        solid: (props) => ({
          bg: props.colorMode==='dark'?'red.500':'red.300',
        })
      },
    },
  },
})
export default theme