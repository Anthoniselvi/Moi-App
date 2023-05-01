import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import Header from "../../components/Header";

import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";

import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AppsIcon from '@mui/icons-material/Apps';
import PieChart from "../../components/PieChart";
const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");
    const [eventsList, setEventsList] = useState([])
    const allTotalAmount = eventsList.reduce((total, event) => total + event.totalAmount, 0);

    const fetchTotals = () => {
        axios.get(`http://localhost:1234/entries/total/${profileId}`).then((response) => {
          // console.log(response);
         
          console.log("Totals : " + JSON.stringify(response.data));
         setEventsList(response.data)
     
        });
      };
      useEffect(() => {
      
        fetchTotals()
      }, []);
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={eventsList.length}
                        subtitle="Total Events"
                        // progress="0.75"
                        // increase="+14%"
                        icon={
                            <AppsIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {/* <StatBox
                        title="431,225"
                        subtitle="Sales Obtained"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <PointOfSaleIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    /> */}
                    <PieChart />
                </Box>
                {/* <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="431,225"
                        subtitle="Sales Obtained"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <PointOfSaleIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box> */}
{/* ROW 2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                Events Generated
                            </Typography>
                            <Typography variant="h3" fontWeight="500" color={colors.greenAccent[500]}>
                            {`₹ ${allTotalAmount}`}
                            </Typography>
                        </Box>
                        {/* <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box> */}
                    </Box>
                    <Box height="250px" mt="-20px">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >

                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            All Events - Total Amount
                        </Typography>
                    </Box>
                    {eventsList.map((singleEvent, i) => (
                        <Box
                            key={`${singleEvent.eventId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                                    {singleEvent.eventName}
                                </Typography>
                                {/* <Typography color={colors.grey[100]}>
                                    {transaction.eventName}
                                </Typography> */}
                            </Box>
                            <Box color={colors.grey[100]}>
                                {singleEvent.eventDate}
                            </Box>
                            <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                                ${singleEvent.totalAmount}
                            </Box>
                        </Box>
                    ))}
                </Box>


            </Box>
        </Box >

    );
};

export default Dashboard;