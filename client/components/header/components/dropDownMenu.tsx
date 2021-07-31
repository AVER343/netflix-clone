import BellIcon from '../icons/bell.svg';
import MessengerIcon from '../icons/messenger.svg';
import CaretIcon from '../icons/caret.svg';
import PlusIcon from '../icons/plus.svg';
import CogIcon from '../icons/cog.svg';
import ChevronIcon from '../icons/chevron.svg';
import ArrowIcon from '../icons/arrow.svg';
import BoltIcon from '../icons/bolt.svg';
import styles from '../header.module.css'
import React, { useState, useEffect, useRef, Children } from 'react';
import { CSSTransition } from 'react-transition-group';
import MainMenu from './menu/main';
import SettingsMenu from './menu/settings';
import RegisterMenu from './menu/register';
import { MenuTitles_ENUM } from './MenuData';
export default function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(0);
    const dropdownRef = useRef<any>(null);
  
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el:any) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }

  
    return (
      <div className={styles["dropdown" ]}
            style={{ height: parseInt(menuHeight.toString())+34 }} 
            ref={dropdownRef}>
  
        <CSSTransition
          in={activeMenu === MenuTitles_ENUM.MAIN}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
              <MainMenu setActiveMenu={setActiveMenu}/>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu === MenuTitles_ENUM.SETTINGS}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
              <SettingsMenu setActiveMenu={setActiveMenu}/>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu ===  MenuTitles_ENUM.REGISTER}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
              <RegisterMenu setActiveMenu={setActiveMenu}/>
        </CSSTransition>
      </div>
    );
  }
  export function DropdownItem(props:{onClick?:any,index:number,isHeader?:boolean,setActiveMenu:any,goToMenu?:string,leftIcon?:any,children?:any,rightIcon?:any}) {
    return (
      <div className={styles["menu-item"]+ ` ${props.isHeader && styles['menu-item-header']}`} 
        onClick={() =>{
          !props.isHeader && props.goToMenu && props.setActiveMenu(props.goToMenu)
          props.onClick && props.onClick()
        }}>
        <span className={styles["icon-button"]} onClick={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}>{props.leftIcon}</span>
        {props.children}
        <span className={styles["icon-right"]}>{props.rightIcon}</span>
      </div>
    );
  }