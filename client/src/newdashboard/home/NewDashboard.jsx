import React from 'react'
import { Box , Typography} from '@mui/material'
import SidebarDrawer from './SidebarDrawer'

const drawerWidth = 240;
export default function NewDashboard() {
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa" }}>
      {/* <CssBaseline /> */}
      <SidebarDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#f5f7fa', p: 3, width: `calc(100% - ${drawerWidth}px)`, }}
      >
        {/* <Toolbar /> */}
        <Typography sx={{color: "#101a34",  
    fontFamily: 'Poppins',   fontWeight: 600,
    fontSize: "32px", lineHeight: "34px", marginTop: "-50px"}}>
          Dashboard
        </Typography>
      <Box sx={{width: "100%", height:  "80vh", borderRadius: "10px", border: "1px solid #cad3dd", marginTop: "5%"}}>
   
        {/* <NewEventsList eventslist={eventslist}/> */}
        </Box>
        
    </Box>
    </Box>
  )
}
