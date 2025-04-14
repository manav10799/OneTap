import React, {useState} from "react";
import "./SideBar.css";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import { Link } from "react-router-dom";

export default function SideBar() {

  const [selectedNav, setSelected] = useState('Dashboard');
  const handleSelect = (item) => {
    setSelected(item);
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navContent = (
    <List component="nav" sx={{ maxWidth: 320, width: 248 }}>
      <Link to="/dashboard">
        <ListItemButton
          sx={{ "--ListItem-paddingY": "12px" }}
          onClick={() => handleSelect("Dashboard")}
          selected={selectedNav === "Dashboard"}
        >
          <i className="bi bi-house"></i> Dashboard
        </ListItemButton>
      </Link>
      <Link to="/files">
        <ListItemButton
          sx={{ "--ListItem-paddingY": "12px" }}
          onClick={() => handleSelect("File Management")}
          selected={selectedNav === "File Management"}
        >
          <i className="bi bi-file-earmark"></i> Task Management
        </ListItemButton>
      </Link>
      <ListItemButton sx={{ "--ListItem-paddingY": "12px" }}>
        <i className="bi bi-bell"></i> Notification
      </ListItemButton>
      <ListItemButton sx={{ "--ListItem-paddingY": "12px" }}>
        <i className="bi bi-person-vcard"></i> User Management
      </ListItemButton>
      <ListItemButton sx={{ "--ListItem-paddingY": "12px" }}>
        <i className="bi bi-file-post-fill"></i> Blog Post
      </ListItemButton>
      <ListItemButton sx={{ "--ListItem-paddingY": "12px" }}>
        <i className="bi bi-gear-wide-connected"></i> Settings
      </ListItemButton>
    </List>
  );

  return (
    <>
      {/* Hamburger - shown on mobile */}
      <div className="md:hidden p-2 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <button onClick={handleDrawerToggle}>
          <i className="bi bi-list text-2xl dark:text-white"></i>
        </button>
      </div>

      {/* Sidebar - visible on desktop */}
      <div className="hidden md:block w-[250px] h-full dark:bg-neutral-900 border-r-2 border-neutral-200 dark:border-neutral-800">
        {navContent}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="bg-white dark:bg-neutral-900 p-4 w-full">
            <button className="mb-4" onClick={handleDrawerToggle}>
              <i className="bi bi-x-lg text-2xl dark:text-white"></i>
            </button>
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
