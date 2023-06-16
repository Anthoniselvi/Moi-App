import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SidebarDrawer from './SidebarDrawer';
import NewEventsList from './NewEventsList';
import axios from 'axios';
import { useState, useEffect } from 'react';

const drawerWidth = 240;

export default function NewHomePage() {
    const navigate = useNavigate()
    const [eventslist, setEventsList] = useState([])
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");
    const navigateToNewEvent = () => {
        navigate("/newEvent")
    }

    const fetchTotals = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/entries/total/${profileId}`).then((response) => {
        // console.log(response);
       
        console.log("Totals : " + JSON.stringify(response.data));
       setEventsList(response.data)
  
      });
    };
    useEffect(() => {
  
      fetchTotals()
    }, []);
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa" }}>
      <CssBaseline />
      <SidebarDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#f5f7fa', p: 3, width: `calc(100% - ${drawerWidth}px)`, }}
      >
        <Toolbar />
        <Typography sx={{color: "#101a34",  
    fontFamily: 'Poppins',   fontWeight: 600,
    fontSize: "32px", lineHeight: "34px", marginTop: "-50px"}}>
          Events
        </Typography>
      <Box sx={{width: "100%", height:  "80vh", borderRadius: "10px", border: "1px solid #cad3dd"}}>
     {/* <Box sx={{height: "10%", width: "100%", borderBottom: "1px solid #cad3dd", display: "flex", alignItems: "center" }}><Typography sx={{color: "#101a34"}}>Upcoming</Typography></Box>
     
     <Box sx={{padding: "5%",height: "80%", width:"90%", display: "flex", flexWrap: "wrap", gap: "20px"}}>
     <Box onClick={navigateToNewEvent}
  sx={{
    height: "200px",
    width: "200px",
    border: "1px solid #cad3dd",
    borderRadius: "10px",
    display: "flex",
    gap: "5%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
    //   bgcolor: "#50bcd9",
      bgcolor: "#FE956F",
      color: "#ffffff",
      "& .MuiTypography-root, & .MuiSvgIcon-root": {
        color: "#ffffff"
      }
    }
  }}
>
  <ControlPointIcon sx={{ fontSize: "40px", 
//   color: "#50bcd9", 
  color: "#FE956F" }} />
  <Typography
    sx={{
      fontWeight: 600,
      fontSize: "17px",
      lineHeight: "22px",
      fontFamily: "Poppins",
      color: "#101a34"
    }}
  >
    Create a new Event
  </Typography>
</Box>


        </Box>  */}
        <NewEventsList eventslist={eventslist}/>
        </Box>
        
    </Box>
    </Box>
  );
}