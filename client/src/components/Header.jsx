import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box alignItems="center" >
            <Typography
                variant="h3"
                color={colors.blueAccent[700]}
                fontWeight="bold"
                sx={{ alignItems:"center" }}
              

            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
