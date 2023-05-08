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
import InboxIcon from '@mui/icons-material/MoveToInbox';
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
}));

export default function NewSidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const auth = useUserAuth();
  const { logOut } = useUserAuth();
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  { index=== 0 ? navigate(`/dashboard?profile=${auth.user.uid}`) : 
  index ===1 ? navigate(`/events?profile=${auth.user.uid}`) : 
  index===2 ? navigate(`/profile?profile=${auth.user.uid}`) : 
  navigate(`/reports?profile=${auth.user.uid}`) }
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
      <AppBar position="fixed" open={open} sx={{background: "none"}}>
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
            background: colors.primary[400],
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{background: "none", display:"flex", justifyContent:"space-between", padding: "0px 20px"}}>
          
        <Typography color={colors.grey[100]} fontSize='18.5px' fontWeight='700'>

MOI APP
</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
   
        </DrawerHeader>
        {/* <Divider /> */}
        <Box sx={{ width: '100%', }}>
      <List  sx={{
        color: colors.blueAccent[2000],
        '& .MuiListItemIcon-root': {
          color: colors.blueAccent[2000]
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
      bgcolor: colors.blueAccent[4000],
      '&, & .MuiListItemIcon-root': {
        color: colors.blueAccent[2000],
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
            <Build />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <ReceiptLong />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
        
      </List>
      <Divider />
      {/* <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItemButton>
        <Divider /> */}

{auth.user ? (
  <ListItem button onClick={handleLogout} sx={{color: colors.blueAccent[2000] , fontWeight: 'bold'}} >
    <ListItemIcon sx={{color: colors.blueAccent[2000]}}>
      <Logout />
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItem>
) : (
  <ListItem button component={Link} to="/" sx={{color: colors.blueAccent[2000] , fontWeight: 'bold'}}>
    <ListItemIcon sx={{color: colors.blueAccent[2000]}}>
      <Login />
    </ListItemIcon>
    <ListItemText primary="Login" />
  </ListItem>
)}
      {/* </List> */}
    </Box>
        {/* <List>
      <ListItem  sx={{display: "flex", backgroundColor: "rgba(36, 153, 239, 0.06)"}}>
        <Link to={`/dashboard?profile=${auth.user.uid}`}>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{color: "rgb(36, 153, 239)", fontStyle: "none"}} />
          </ListItemButton>
        </Link>
      </ListItem>

      <ListItem  sx={{fontStyle: "none"}}>
        <Link to={`/events?profile=${auth.user.uid}`}>
        <ListItemButton>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Events" sx={{color: "inherit", fontStyle: "none"}}/>
          </ListItemButton>
        </Link>
      </ListItem>

      <ListItem >
        <Link to={`/profile?profile=${auth.user.uid}`}>
        <ListItemButton>
          <ListItemIcon>
            <Build />
          </ListItemIcon>
          <ListItemText primary="Profile" />
          </ListItemButton>
        </Link>
      </ListItem>

      <ListItem >
        <Link to={`/reports?profile=${auth.user.uid}`}>
        <ListItemButton >
          <ListItemIcon>
            <ReceiptLong />
          </ListItemIcon>
          <ListItemText primary="Reports" />
          </ListItemButton>
        </Link>
      </ListItem>

      <Divider />

      {auth.user ? (
        <ListItem button onClick={handleLogout} sx={{padding: 5}}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      ) : (
        <ListItem button component={Link} to="/"  sx={{padding: 5}}>
          <ListItemIcon>
            <Login />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      )}
    </List> */}
   
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader /> */}
      
      </Main>
    </Box>
  );
}