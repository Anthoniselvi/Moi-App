import React from 'react';
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AnimationIcon from '@mui/icons-material/Animation';
import ListIcon from '@mui/icons-material/List';
import BuildIcon from '@mui/icons-material/Build';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import { useUserAuth } from '../../auth';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';



const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { logOut } = useUserAuth();
  const navigate = useNavigate()


  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

//   console.log("Item component rendered");

  return (
      <MenuItem active={selected === title} style={{ color: colors.grey[100], "!important": true }}onClick={(title.toLowerCase() === "logout") ? handleLogout : () => setSelected(title)} icon={icon}>
          <Typography variant="h5" >{title}</Typography>
          <Link to={to} />

      </MenuItem >
  )
}


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard")
        const auth = useUserAuth();

    console.log("auth in Sidebar: ", auth);
  
   
    return (
      
        <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 20px 5px 20px !important",
          },
          "& .pro-menu-item:hover": {
            backgroundColor: '#223141 !important',
            // margin: '10px',
            borderRadius: '20px'
          },
          "& .pro-menu-item.active": {
            color: `${colors.blueAccent[2000]} !important`,
            backgroundColor: '#223141 !important',
            margin: '10px',
            borderRadius: '20px'
        },
       
       
        }}
      
      
        >

            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="5px"
                            >
                                <Typography color={colors.grey[100]} fontSize='18.5px' fontWeight='700'>

                                    MOI APP
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined :"0%"}>
                        <Item
                            title="Dashboard"
                            to={`/dashboard?profile=${auth.user.uid}`}
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                           
                        />
                        <Item
                            title="Events List"
                            to={`/events?profile=${auth.user.uid}`}
                            icon={<ListIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            
                        />
                        {/* <Typography
                            variant='h5'
                            color={colors.grey[100]}
                            sx={{ m: "15px 0 15px 20px" }}
                        >Utilities</Typography> */}
                        <Item
                            title="Profile"
                            to={`/profile/${auth.user.uid}`}
                            icon={<BuildIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        
                        />

                        {/* <Item
                            title="Parts"
                            to="/utility/parts"
                            icon={<TripOriginIcon />}
                            selected={selected}
                            setSelected={setSelected}
                         
                        />


                        <Item
                            title="Materials"
                            to="/utility/materials"
                            icon={<AnimationIcon />}
                            selected={selected}
                            setSelected={setSelected}
                           
                        /> */}
 <Item
                            title="Reports"
                            to="/reports"
                            icon={<ReceiptLongIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    
                    </Box>
                    <Box paddingLeft={isCollapsed ? undefined : "0%"} marginTop="30%">
                        { auth.user ? 
                          <Item
                          title="Logout"
                          // to="/logout"
                          icon={<LogoutIcon />}
                          selected={selected}
                          setSelected={setSelected}                       
                      /> : 
                        <Item
                            title="Login"
                            to="/"
                            icon={<LoginIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> 
                       } 
                        </Box>
                       
                </Menu>
            </ProSidebar>
        </Box >
    );
}

export default Sidebar 