import React, { useContext } from "react";
import axios from "axios";
import themeContext from "../../theme/themeContext";
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

export default function Header({user, setUser}) {
  const { theme, toggleTheme } = useContext(themeContext);

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/auth/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        window.location.href = "/login";
      })
      .catch((err)=> console.log(err));
  };

  return (
    <div className="header flex items-center justify-between pl-[36px] pr-[36px] dark:bg-neutral-900 h-[50px] w-screen border-b-2 border-neutral-200 dark:border-neutral-800">
      <div className="logo h-[50px] flex items-center">
        <img
          src={`${
            theme === "dark"
              ? "../../images/lightlogo.svg"
              : "../../images/logo.svg"
          }`}
          className="h-[15px] cursor-pointer"
        />
      </div>
      <div className="user-navigation-bar">
        <i
          className={`bi text-2xl mr-[20px] cursor-pointer ${
            theme === "dark" ? "text-white bi-moon" : "bi-brightness-low"
          }`}
          onClick={toggleTheme}
        ></i>
        <Dropdown>
          <MenuButton variant="plain">
            <i
              className={`bi bi-person-circle text-2xl cursor-pointer ${
                theme === "dark" ? "text-white" : ""
              }`}
            ></i>
          </MenuButton>
          <Menu>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem onClick={()=> handleLogout()}>Logout</MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
}
