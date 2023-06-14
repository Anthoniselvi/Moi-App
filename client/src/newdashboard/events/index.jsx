import { Box, Input, Typography } from '@mui/material'
import React from 'react'
import SidebarDrawer from '../home/SidebarDrawer'
import CssBaseline from '@mui/material/CssBaseline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Label } from '@mui/icons-material';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
      border: '1px solid',
      borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
export default function NewEvents() {
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa" }}>
    {/* <CssBaseline /> */}
    <SidebarDrawer />
   <Box sx={{minHeight: "80vh", width: "80%", padding:" 5% 20%",     backgroundColor: "#fff",
    border: "1px solid #e8ecf1", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Box sx={{ borderBottom:"1px solid #e8ecf1", height: "20%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: "40px"}}>
        <CardGiftcardIcon sx={{fontSize: "60px", color: "#FE956F"}}  />
<Typography sx={{color: "#101a34", textAlign: "center", fontFamily: "Poppins", fontSize: "30px", fontWeight: 600}}>Let's create your Event!</Typography> 
   </Box>
   <Box>
   <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
</FormControl>

   </Box>
   </Box>
   </Box>
  )
}
