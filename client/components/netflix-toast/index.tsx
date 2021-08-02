import { CloseIcon } from '@chakra-ui/icons'
import {Alert,AlertIcon,CloseButton} from '@chakra-ui/react'
const CustomToast = ({children,onClose,...restProps}:any)=>{
    return <Alert 
    borderRadius='4px' 
    backgroundColor='#e50914' 
    textColor='#fff' 
    variant="solid"
    {...restProps}>
    <AlertIcon />
   {children}
   <CloseButton onClick={onClose} size='lg'/>
  </Alert>
}
export default CustomToast