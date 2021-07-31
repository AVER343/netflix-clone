
import React from "react"
import BellIcon from '../../icons/bell.svg';
import MessengerIcon from '../../icons/messenger.svg';
import CaretIcon from '../../icons/caret.svg';
import PlusIcon from '../../icons/plus.svg';
import CogIcon from '../../icons/cog.svg';
import ChevronIcon from '../../icons/chevron.svg';
import ArrowIcon from '../../icons/arrow.svg';
import BoltIcon from '../../icons/bolt.svg';
import styles from '../../header.module.css'
import { DropdownItem } from "../dropDownMenu"
import { MenuData, MenuTitles_ENUM, menu_representation } from "../MenuData";
const SettingsMenu=(props:{setActiveMenu:(el:string)=>void})=>{
    return <div className={styles["menu"]}>
    <DropdownItem index={0} setActiveMenu={props.setActiveMenu} goToMenu="main" isHeader={true}
                leftIcon={ArrowIcon}>
      <h2>{menu_representation.filter(e=>e.goToMenu==MenuTitles_ENUM.SETTINGS)['0']['name']}</h2>
    </DropdownItem>
    {MenuData['settings']
            .map((e,i)=><DropdownItem index={i+1} key={i} 
                    {...e}
                    setActiveMenu={props.setActiveMenu}>
                    {e.name}</DropdownItem>)}
            </div>
}
export default SettingsMenu