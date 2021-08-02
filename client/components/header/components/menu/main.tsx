import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/client';
import { DropdownItem } from '../dropDownMenu';
import styles from '../../header.module.css';
import { menu_representation } from '../MenuData';

const MainMenu = (props:any) => {
  const [session] = useSession();
  useEffect(() => {}, [session]);
  return (
    <div className={styles.menu}>
      <DropdownItem
        index={0}
        isHeader={false}
        setActiveMenu={props.setActiveMenu}
        goToMenu={menu_representation[0].goToMenu}
        key={0}
      >
        {menu_representation[0].goToMenu.charAt(0).toUpperCase() + menu_representation[0].goToMenu.slice(1)}
      </DropdownItem>
      <DropdownItem
        index={1}
        isHeader={false}
        setActiveMenu={props.setActiveMenu}
        goToMenu={menu_representation[1].goToMenu}
        key={1}
      >
        {menu_representation[1].goToMenu.charAt(0).toUpperCase() + menu_representation[1].goToMenu.slice(1)}
      </DropdownItem>
      {session?.user
        ? (
          <DropdownItem
            index={2}
            isHeader={false}
            setActiveMenu={props.setActiveMenu}
            onClick={() => signOut()}
            key={2}
          >
            Logout
          </DropdownItem>
        )
        : (
          <DropdownItem
            index={2}
            isHeader={false}
            setActiveMenu={props.setActiveMenu}
            goToMenu={menu_representation[2].goToMenu}
            key={2}
          >
            {menu_representation[2].goToMenu.charAt(0).toUpperCase() + menu_representation[2].goToMenu.slice(1)}
          </DropdownItem>
        )}
    </div>
  );
};
export default MainMenu;
