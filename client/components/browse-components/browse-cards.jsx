import {motion} from 'framer-motion'
import { Box ,Img} from '@chakra-ui/react'
const BrowseCards=({content,setAccodionId,handleClick,type,ref,i})=>{
    return <>{content?.filter((e)=>e.data.genre.includes(type))
            .map(({data,id},index)=>
            <motion.div  whileHover={{
                scale: 1.2,
                transition: { duration: .5 },
            }}>
                    <Box  w="100%">
                        <Img ref={ref[i]} 
                            onClick={async()=>{
                            await handleClick(i,index);
                            await setAccodionId(id)
                            }} 
                            placeholder="blur" 
                            alt={`${data.slug}`}
                            src={`/images/${category}/${data.genre}/${data.slug}/small.jpg`}/></Box>
            </motion.div>)}
            </>
}
export default BrowseCards