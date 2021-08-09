import { getSession, signOut, useSession } from "next-auth/client"
import React, { createRef, useEffect, useRef, useState } from "react";
import {Card,LoadingProfile,Header,Player,BrowseHeader} from "../../components";
import { SelectProfileContainer,Footer } from "../../containers";
import FooterContainer from "../../containers/Footer";
import API from "../../Shared/API";
import { ROUTES } from "../../Shared/Constants";
import logo from '../../logo.svg';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Grid, Heading, Stack } from "@chakra-ui/react";
import { Img } from "@chakra-ui/react"
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
const SelectProfile=(props:any)=>{
    let [profile,setProfile]= useState<any>(null) //select profile
    let [category, setCategory] = useState('series');  /// 'films' series'  etc.
    let [session,loading] = useSession()   // authentication
    let [content,setContent]=useState(null)  // list of content of specified category
    let [indexOfAccordionContrent,setindexOfAccordionContrent]=useState(null)
    let [isContentLoaded,setIsContentLoaded]=useState(false) // has content loaded
    let [searchTerm, setSearchTerm] = useState(''); // Searching element
    let [allProfiles,setAllProfiles]=useState(['user']) // all profiles to select from ( then select 1 profile)
    let [Types,setTypes]=useState([]) // Unique Types like 'Action', Drama etc.
    let [ref,setRef] = useState<any>([]) /// for referencing Accordion from images
    let [isAccodionOpen,setAccodionOpen] = useState<any>([]) // self explanatory
    let [accordionId,setAccodionId] = useState<any>(null) // self explanatory
    const getContent=async ()=>{
        try{
            if(!loading && (session && profile || !session))
            {
              let response = await API.getContentFromClient(session?.user?.id,{category,searchTerm})
              await setContent(response.data.filter(e=>e.data.type==category))
              let UniqueTitles:string[]=[]
              response.data.map(e=>UniqueTitles.push(...e.data.genre))
              UniqueTitles=[...new Set(UniqueTitles)];
              setTypes(UniqueTitles)
              setIsContentLoaded(true)
            }
          }
        catch(e){
            console.log(e)
        }
    }
    
    useEffect(()=>{
      if(window?.localStorage.getItem('profile')){
        setProfile(JSON.parse(window?.localStorage.getItem('profile')||''))
      }
    },[])
    let handleClick=async(indexOfType,indexOf)=>{

        if(isAccodionOpen[indexOfType])
        {
                //1-> same icon clicked upon - close
          if(indexOf==indexOfAccordionContrent)
          {
            await setAccodionOpen(Types.map((e,i)=>false || i==indexOfType))
            await Object.values(ref[indexOfType].current)?.[1].onClick()
            setTimeout(async()=>{
              await setAccodionOpen(Types.map((e,i)=>false || i==indexOfType && !!!isAccodionOpen[i]))
              },100)   
            }
          //2-> same row ,different icon
          else if(indexOf==null || indexOf==undefined){
            await Object.values(ref[indexOfType].current)?.[1].onClick()
            setTimeout(async()=>{
                await setAccodionOpen(Types.map((e,i)=>false))
              },100)
         }
         else{
          await  Object.values(ref[indexOfType].current)?.[1].onClick()
          await  Object.values(ref[indexOfType].current)?.[1].onClick()

         }
        }
        else{
          //3-> diff row
          await setAccodionOpen(Types.map((e,i)=>false || i==indexOfType))
          await Object.values(ref[indexOfType].current)?.[1].onClick()
          setTimeout(async()=>{
          await setAccodionOpen(Types.map((e,i)=>false || i==indexOfType && !!!isAccodionOpen[i]))
          },0)
        }
        setindexOfAccordionContrent(indexOf)
    }
    useEffect(()=>{
       getContent()
    },[profile,loading,category])
    useEffect(()=>{
      setRef(elRefs => (Array(Types.length).fill().map((_, i) => elRefs[i] || createRef())));
      setAccodionOpen(Types.map(e=>false))
    },[Types.length])
    return <>
                {
                props.session?.user && !profile  &&
                allProfiles.map((e,i)=><SelectProfileContainer key={i} user={props.session?.user} setProfile={setProfile} />)
                } {/*(authenticated user selects profile) */}
                {
                    props.session?.user 
                    && profile
                    && !isContentLoaded
                    ? <LoadingProfile src={props.session?.user?.user_custom_properties?.photoURL}></LoadingProfile>
                    : <LoadingProfile.ReleaseBody></LoadingProfile.ReleaseBody>
                }
                {  ((props.session?.user 
                    && profile)||(! props.session?.user))
                    && isContentLoaded
                    && <>
                    <BrowseHeader getContent={getContent} session={session} logo= {logo} category= {category} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCategory={setCategory}/>
                    <div>
                      {Types.map((type:string,i)=>{
                      return <div style={{margin:'3vw 0'}}>
                      <div style={{ magin:'0 4% .5em 4%',fontSize:'1.4vw',color:'var(--text-color-primary)',}}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                      <Grid templateColumns="repeat(5,1fr)" gap={1}>
                          {content?.filter((e)=>e.data.genre.includes(type))
                                    .map(({data,id},index)=>
                                            <Box  w="100%">
                                              <Img ref={ref[i]} 
                                                  onClick={async()=>{
                                                   await handleClick(i,index);
                                                    await setAccodionId(id)
                                                  }} 
                                                  placeholder="blur" 
                                                  alt={`${data.slug}`}
                                                  src={`/images/${category}/${data.genre}/${data.slug}/small.jpg`}/></Box>)}
                      </Grid> 
                     {isAccodionOpen[i]
                     && isAccodionOpen[i]==true 
                     &&
                      <Accordion allowMultiple allowToggle>
                      <AccordionItem >
                          <AccordionButton ref={ref[i]}>
                          </AccordionButton>
                       <BrowseAccordionPanel 
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
                  {Types.length==0 && <div>NO RESULTS FOUND </div>}
                  </div>
            <Footer/>
            </>}
        </>
}
function BrowseAccordionPanel({category,content,type,ref,index,id,handleClick}:any){
  return  <AccordionPanel pb={4}>
              <Card.Feature  index={index} handleClick={handleClick} ref={ref} category={category} {...content?.filter(e=>e.id==id)?.[0]?.data}>
                <Player>
                  <Player.Button />
                  <Player.Video src="/videos/bunny.mp4" />
                </Player>
              </Card.Feature>
            </AccordionPanel>
}
export async function getServerSideProps(context){
    let session:any =await getSession(context);
    let user_id= session?.user?.['id']
    let content 
    if(typeof user_id=='number')
    {
        content = await API.getContentFomServer(user_id);
    }
    else{
        content = await API.getContentFomServer();
    }
    return {props:{session,content:content.data}
    }
}
export default SelectProfile