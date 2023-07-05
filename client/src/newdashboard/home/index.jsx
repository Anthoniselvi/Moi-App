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

    const navigateToCreateEvent = () => {
      navigate(`/newevent?profile=${profileId}`)
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
 
      <Box margin="20px" sx={{margrinTop:"0px"}}  >
        <Toolbar />
       
        <Typography sx={{color: "#101a34",  
    fontFamily: 'Poppins',   fontWeight: 600,
    fontSize: "32px", lineHeight: "34px", }}>
          Events
        </Typography>
 
      
      <Box sx={{width: "100%", minHeight:  "80vh", borderRadius: "10px", marginTop: "5%"}}>
         <NewEventsList eventslist={eventslist}/>
        </Box>
        
    </Box>
  );
}