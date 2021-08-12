import { ROUTES } from "../../Shared/Constants";
import logo from '../../logo.svg';
import {motion} from 'framer-motion'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Grid, Heading, Stack } from "@chakra-ui/react";
import { Img } from "@chakra-ui/react"
import {BrowseHeader} from '../index';
import { SelectProfileContainer,Footer } from "../../containers";
import FooterContainer from "../../containers/Footer";
import BrowseCards from './browse-cards'
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
const BrowseComponents=({getContent,session,logo,category,searchTerm,setSearchTerm,setCategory,children})=>{
        return <>
        <BrowseHeader 
            getContent={getContent} 
            session={session} 
            logo= {logo} 
            category={category} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            setCategory={setCategory}/>
            {children}
        <Footer/>
</>
}
BrowseComponents.Content=({Types,isAccodionOpen,ref,accordionId,setAccodionId,category,content,handleClick})=>{
    console.log({ref})
    return   <div>
            {Types.map((type,i)=>{
            return <div style={{margin:'3vw 0',overflow:'hidden',marginLeft:'1vw',marginRight:'1vw '}} >
            <div style={{ magin:'0 4% .5em 4%',fontSize:'1.4vw',color:'var(--text-color-primary)',}}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <Grid templateColumns="repeat(5,1fr)" gap={1}>
                <BrowseCards setAccodionId={setAccodionId} content={content} type={type} ref={ref} i={i}/>
            </Grid> 
        {isAccodionOpen[i]
        && isAccodionOpen[i]==true 
        &&
            <Accordion allowMultiple allowToggle>
            <AccordionItem >
                <AccordionButton ref={ref[i]}>
                </AccordionButton>
            <BrowseComponents.BrowseAccordionPanel 
                index={i}
                id={accordionId}
                ref={ref[i]}
                category={category}
                content={content} 
                type={type}
                handleClick={handleClick}
                />
            </AccordionItem>
        </Accordion>}
        </div>
        })}
        {Types.length==0 && <div>NO RESULTS FOUND (Change) </div>} 
        </div>
}
BrowseComponents.BrowseAccordionPanel= ({category,content,type,ref,index,id,handleClick})=>{
    return  <AccordionPanel pb={4}>
                <Card.Feature  index={index} handleClick={handleClick} ref={ref} category={category} {...content?.filter(e=>e.id==id)?.[0]?.data}>
                  <Player>
                    <Player.Button />
                    <Player.Video src="/videos/bunny.mp4" />
                  </Player>
                </Card.Feature>
              </AccordionPanel>
  }
export default BrowseComponents