import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonIcon from "@mui/icons-material/Person";

import { useUserAuth } from "../../auth";




const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
const auth = useUserAuth()

    return (
       
            <Box display="flex" justifyContent="right">
                <IconButton onClick={colorMode.toggleColorMode}>
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
                </IconButton>
                <IconButton >
        {/* //          onMouseOver={(event) => { */}
        {/* //   event.currentTarget.title = `Welcome ${auth.role}`; 
        // }}
        // onMouseLeave={(event) => { */}
        {/* //   event.currentTarget.title = ""; 
        // }}
        // > */}
                 <Box sx={{border: "1px solid white", display: "flex", gap: '10px', padding: "5px 10px", borderRadius: "20px"}}>  
                 {/* <Typography>Hi, {auth.role.toUpperCase()}</Typography> */}

<Typography>{auth.user.displayName}</Typography>
<PersonIcon /></Box>
                </IconButton>
            </Box>
 
    )
}

export default Topbar 