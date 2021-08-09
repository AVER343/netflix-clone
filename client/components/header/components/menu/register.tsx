import { signIn, signOut, useSession } from "next-auth/client";
import {useRouter} from "next/router";
import React, { useEffect } from "react"
import { ROUTES } from "../../../../Shared/Constants";
const ArrowIcon = require('../../icons/arrow.svg') 
import styles from '../../header.module.css'
import { DropdownItem } from "../dropDownMenu"
import { MenuData, MenuTitles_ENUM, menu_representation } from "../MenuData";
const RegisterMenu=(props:any)=>{
  const [session,loading]=useSession()
  const router = useRouter()
    useEffect(()=>{},[session])
  console.log({session,loading})
    return <div className={styles["menu"]}>
        <DropdownItem index={0} 
                      isHeader={true}
                      setActiveMenu={props.setActiveMenu} 
                      goToMenu="main" 
                      leftIcon={<ArrowIcon/>}>
      <h2>{menu_representation.filter(e=>e.goToMenu==MenuTitles_ENUM.REGISTER)['0']['name']}</h2>
        </DropdownItem>
      {!session && <DropdownItem key={1} index={1} setActiveMenu={props.setActiveMenu} onClick={()=>router.push(ROUTES.LOGIN)}>
          Login</DropdownItem>}
  </div>
}
export default RegisterMenu