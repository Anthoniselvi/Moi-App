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
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useSearchParams } from 'react-router-dom';

const drawerWidth = 240;

export default function SidebarDrawer() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");
  const navigateToNewEvent = () => {
    navigate("/newEvent");
  };
  const navigateToDashboard = () => {
    navigate(`/newdashboard?profile=${profileId}`);
    // navigate("/newhome");
  };
  const navigateToEvents = () => {
    // navigate("/neweventslist");
    navigate(`/newhome?profile=${profileId}`);
  };
  const navigateToProfile= () => {
    // navigate("/newprofile");
    navigate(`/newprofile?profile=${profileId}`);
  };
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa",  }}>
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
          '& .MuiButtonBase-root-MuiButton-root' : {
            padding: 0
          }
        }}
        variant="permanent"
        anchor="left"
      >
       <Typography sx={{color: "#101a34",fontWeight: 600, textAlign: "center",
          fontFamily: 'Poppins',
          fontSize: "32px"}}>
          MOI<span style={{fontWeight: 400,}}>LIST</span>
       </Typography>
        <Divider />
        <List sx={{color: "black"}}>
          {[
            { text: 'Dashboard', icon: <HomeIcon />, onClick: navigateToDashboard },
            { text: 'Events', icon: <MailIcon />, onClick: navigateToEvents },
            { text: 'Profile', icon: <PersonIcon />, onClick: navigateToProfile },
            // { text: 'Drafts', icon: <MailIcon />, onClick: navigateToDrafts },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <Button fullWidth onClick={item.onClick} sx={{
                      color: "black",
                      '&:hover': {
                        // Define the hover styles here
                        color: "blue",
                        backgroundColor: "#f5f7fa"
                        // Add other styles as needed
                      },
                    }}>
                <ListItemButton>
                <ListItemIcon
                    sx={{
                      color: "black",
                      '&:hover': {
                        // Define the hover styles here
                        color: "blue",
                       
                        backgroundColor: "#f5f7fa"
                        // Add other styles as needed
                      },
                    }}
                    // onMouseOver={handleIconHover}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{color: "black"}} />
                </ListItemButton>
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
