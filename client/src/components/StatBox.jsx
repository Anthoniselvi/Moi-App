import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle1, subtitle2, icon, progress, increase }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px" >
            <Box display="flex"  gap="30px" >
               
               <Box border="1px solid white" display="flex" alignItems="center" justifyContent="center" padding="0px 18px" borderRadius="50%" backgrouond="white">
            {/* //    padding="10px 16px" borderRadius="50%" backgrouond="white"> */}
                    {icon}
                    </Box>
                    <Box>
                    <Typography variant="h4"   fontWeight="bold" sx={{ color:colors.grey[100]  }}>
                    {subtitle1}
                </Typography>
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{ color: colors.greenAccent[500] }}
                    >
                        {title}
                    </Typography>
                 
                
                </Box>
                {/* <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    {subtitle2}
                </Typography> */}
            </Box>
            {/* <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    {subtitle}
                </Typography>
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[600] }}
                >
                    {increase}
                </Typography>
            </Box> */}
        </Box>
    );
};

export default StatBox;