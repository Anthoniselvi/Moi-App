import React from 'react'
import { Box , Typography} from '@mui/material'
import SidebarDrawer from '../home/SidebarDrawer'
import NewEntiesList from '../entries'

export default function NewEventPage() {
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa" }}>
    {/* <CssBaseline /> */}
    <SidebarDrawer />
    <Box 
   sx={{minHeight: "80vh", width: "80%", padding:" 5%",     
   backgroundColor: "#fff",
    border: "1px solid #e8ecf1", borderRadius: "10px", 
    display: "flex", flexDirection: "column", alignItems: "center"}}>
     
        <Typography sx={{color: "#101a34",  
    fontFamily: 'Poppins',   fontWeight: 600,
    fontSize: "32px", lineHeight: "34px", marginTop: "-50px"}}>
          Moi - Entries
        </Typography>
      <Box sx={{width: "100%", height:  "80vh", borderRadius: "10px", border: "1px solid #cad3dd"}}>
     <Box sx={{height: "10%", width: "100%", borderBottom: "1px solid #cad3dd", display: "flex", alignItems: "center" }}><Typography sx={{color: "#101a34"}}>Upcoming</Typography></Box>
     
     <Box sx={{padding: 0,height: "100%", width:"100%", display: "flex", flexWrap: "wrap", gap: "20px", backgroundColor: "#ffffff"}}>
   <NewEntiesList />
        </Box>
        </Box>
        </Box>
        </Box>
  )
}
