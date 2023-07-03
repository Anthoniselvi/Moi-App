import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Home, List as ListIcon, Build, ReceiptLong, Login, Logout } from '@mui/icons-material';
import { tokens } from '../../theme';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../auth';
import NewReports from '../reports/NewReports';


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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  marginLeft:0
}));

export default function NewSidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const auth = useUserAuth();
  const { logOut } = useUserAuth();
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  { index=== 0 ? navigate(`/newdashboard?profile=${auth.user.uid}`) : 
  index ===1 ? navigate(`/newhome?profile=${auth.user.uid}`) : 
  index===2 ? navigate(`/newprofile?profile=${auth.user.uid}`) : 
  index===3 ? handleLogout() :
  navigate("/login") }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("auth in Sidebar: ", auth);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline sx={{background: "none"}} />
      <AppBar position="fixed" open={open} sx={{background: "none", boxShadow: "none"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
     
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
            background: "none",
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            background: "#fff",
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{background: "none", display:"flex", justifyContent:"space-between", padding: "0px 20px"}}>
          
        <Typography color="#101a34" fontSize='18.5px' fontWeight='700'>

MOI APP
</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
   
        </DrawerHeader>
        {/* <Divider /> */}
        <Box sx={{ width: '100%', }}>
      <List  sx={{
        color: "#101a34",
        '& .MuiListItemIcon-root': {
          color: "#101a34"
        },
    // selected and (selected + hover) states
    '&& .Mui-selected, && .Mui-selected:hover': {
      bgcolor: 'rgba(36, 153, 239, 0.06)',
      '&, & .MuiListItemIcon-root': {
        color: 'rgb(36, 153, 239)',
       },
    },
    // hover states
    '& .MuiListItemButton-root:hover': {
      bgcolor: "#f5f7fa",
      '&, & .MuiListItemIcon-root': {
        color: "#50bcd9",
      },
    },
  }}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
          <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
              
      
      {/* <Divider /> */}

{auth.user ? (
  <ListItemButton onClick={(event) => handleListItemClick(event, 3)}
  // onClick={handleLogout} 
  sx={{color:"#101a34" , fontWeight: 'bold'}} >
    <ListItemIcon sx={{color: "#101a34" }}>
      <Logout />
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItemButton>
) : (
  <ListItemButton component={Link} to="/" sx={{color: "#101a34"  , fontWeight: 'bold'}}>
    <ListItemIcon sx={{color: "#101a34" }}>
      <Login />
    </ListItemIcon>
    <ListItemText primary="Login" />
  </ListItemButton>
)}
</List>
    </Box>
     
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      
      </Main>
    </Box>
  );
}