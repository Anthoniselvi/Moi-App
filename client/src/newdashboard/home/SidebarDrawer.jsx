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
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function SidebarDrawer() {
    const navigate = useNavigate()

    const navigateToNewEvent = () => {
        navigate("/newEvent")
    }
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa" }}>
      <CssBaseline />
  
      <Drawer
        sx={{
          width: drawerWidth, 
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box', 
            backgroundColor: "#ffffff" , color: "#101a34"
          },
        }}
        variant="permanent"
        anchor="left"
      >
       <Typography sx={{color: "#101a34",fontWeight: 600, textAlign: "center",
    fontFamily: 'Poppins',
    fontSize: "32px"}}>MOI<span style={{fontWeight: 400}}>LIST</span> </Typography>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
     
    </Box>
  );
}