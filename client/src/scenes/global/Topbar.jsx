import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { ColorModeContext } from '../../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from "@mui/icons-material/Person";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import { useUserAuth } from "../../auth";
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NewSidebar from "./NewSidebar";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [open, setOpen] = useState(false);
const auth = useUserAuth()

const handleDrawerOpen = () => {
    setOpen(true);
  };
    return (
       
            <Box display="flex" justifyContent="right">
                <AppBar position="fixed" open={open} sx={{background: "none", boxShadow: "none"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon style={{color: "#121212"}} />
          </IconButton>
     
        </Toolbar>
      </AppBar>
      <NewSidebar open={open} setOpen={setOpen}/>
                {/* <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton> */}
                {/* <IconButton >
     
                 <Box sx={{border: "1px solid white", display: "flex", gap: '10px', padding: "5px 10px", borderRadius: "20px"}}>  
        
<Typography>{auth.user.displayName}</Typography>
<PersonIcon /></Box>
                </IconButton> */}
            </Box>
 
    )
}

export default Topbar 