const BellIcon = require('./icons/bell.svg')
const MessengerIcon = require('./icons/messenger.svg')
const CaretIcon = require('./icons/caret.svg') ;
const  PlusIcon =  require("./icons/plus.svg");
import { useSession } from "next-auth/client"
import DropdownMenu from './components/dropDownMenu'
import React, { useState, useEffect, useRef } from 'react';
import styles from './header.module.css'
import { useColorMode } from '@chakra-ui/react';
import { DARK_SVG ,LIGHT_SVG} from './icons/THEME_SVG';
function HeaderComponent() {
  const {colorMode,toggleColorMode}=useColorMode()
  return (
    <Navbar>
      <NavItem onClick={toggleColorMode} icon={colorMode!=='dark'?<DARK_SVG />:<LIGHT_SVG/>}/>
      <NavItem icon={<PlusIcon/>}  />
      <NavItem icon={<BellIcon/>} />
      <NavItem icon={<MessengerIcon/>} />
      <NavItem icon={<CaretIcon/>}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props:any) {
  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["navbar-nav"]}>{props.children}</ul>
    </nav>
  );
}

function NavItem(props:any) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles["nav-item"]}>
      <a href="#" className={styles["icon-button"]} onClick={() => {
        setOpen(!open)
        props.onClick && props.onClick()
        }}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}


export default HeaderComponent;