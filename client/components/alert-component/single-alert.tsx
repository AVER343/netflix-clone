import {Alert,AlertIcon,CloseButton,Center} from '@chakra-ui/react'
const SingleAlert=({children,closable=true,...restProps}:any)=>{
    return <Alert  {...restProps} backgroundColor='#e50914' color='#fff' variant="solid">
    <Center {...restProps}> 
        <AlertIcon />
        {children}
    </Center>
    {closable && <CloseButton />}
</Alert>
}
export default SingleAlert