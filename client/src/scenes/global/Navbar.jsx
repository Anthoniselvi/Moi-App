/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./Navbar.css";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()

  const navigateToLogin = () => {
    navigate("/login")
  }
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Services",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "How To Works",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
  
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        <h1>MOI APP</h1>
      </div>
      <div className="navbar-links-container">
      
        <a href="/">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#works">How to Works</a>
        <a href="#testimonal">Testimonials</a>
        <a href="#footer">Contact</a>  
       
        <button className="primary1-button" onClick={navigateToLogin}>Login</button> 
        <button className="primary-button" onClick={navigateToLogin}>Sign Up</button>
       
      </div>
     
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right" sx={{zIndex: 4000}}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* <Divider /> */}
          <div style={{display: "flex", flexDirection:"column", gap:"20px", width:"80%", alignItems: "center", margin: "0 10px" }}>
          <button className="primary1-button" style={{width:"100%"}} onClick={navigateToLogin}>Login</button> 
        <button className="primary-button" style={{width:"100%"}}  onClick={navigateToLogin}>Sign Up</button>
        </div>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
