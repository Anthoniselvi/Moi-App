import { Box, Button, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import Header from "../../components/Header";

import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";

import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AppsIcon from '@mui/icons-material/Apps';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PieChart from "../../components/PieChart";
import PieForGift from "../../components/PieForGift";
import LineChart from "../../components/LineChart";
const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");
    const [eventsList, setEventsList] = useState([])
    const [allEntries, setAllEntries] = useState([])
    const [totalAmount, setTotalAmount] = useState()
    const [totalGift, setTotalGift] = useState()
    const [maxAmount, setMaxAmount] = useState({})
    const [maxAmountEvent, setMaxAmountEvent] = useState({})
    const [inputValue, setInputValue] = useState()
   
    const moreThanAmount = allEntries.filter(entry => entry.amount > 10000);

console.log("Amount more than 10000: " + JSON.stringify(moreThanAmount)); 

const filteredEntries = allEntries.filter(entry => entry.amount >= inputValue);

console.log("filteredEntries more than" + inputValue + ":" + JSON.stringify(filteredEntries));

    const fetchTotals = () => {
        axios.get(`http://localhost:1234/entries/total/${profileId}`).then((response) => {
          // console.log(response);
         
          console.log("Totals : " + JSON.stringify(response.data));
         setEventsList(response.data)
     
        });
      };
      const fetchAllEntriesByProfileId = () => {
        axios.get(`http://localhost:1234/entries/allentries/${profileId}`).then((response) => {
          // console.log(response);
         
          console.log("All Entries from ProfileId : " + JSON.stringify(response.data));
         setAllEntries(response.data.entriesList)
         setTotalAmount(response.data.totalAmount)
         setTotalGift(response.data.totalGift)
         setMaxAmount(response.data.maxAmountEntry)
     setMaxAmountEvent(response.data.maxAmountEventList)
        });
      };
      console.log("MaxAmount : " + maxAmount.amount)
      console.log("MaxAmount Given By : " + maxAmount.personName)
      console.log("MaxAmount Event Name : " + maxAmountEvent.name)

      useEffect(() => {      
        fetchTotals()
        fetchAllEntriesByProfileId()
      }, []);
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            </Box>

            {/* GRID & CHARTS */}
            <Box m="20px 0px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 4"
                    // gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    paddingTop="30px"
                  
                >
                    <StatBox
                        title={`Total Events - ${eventsList.length}`}
                        // subtitle1={`Total Amount - ₹ ${allTotalAmount}`}
                        // subtitle2={`Total Gifts - ₹ ${allTotalGift}`}
                        // progress="0.75"
                        // increase="+14%"
                        icon={
                            <AllInboxIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    // gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    paddingTop="30px"
                >
                    <StatBox
                        title={`Total Amount - ₹ ${totalAmount}`}
                        // subtitle1={`Maximum Amount - ₹ ${maxAmount.amount}`}
                        // subtitle2={`Total Gifts - ₹ ${allTotalGift}`}
                        // progress="0.75"
                        // increase="+14%"
                        icon={
                            <CurrencyRupeeIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                
    {/* ROW 2 */}
                <Box
                    gridColumn="span 4"
                    // gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    paddingTop="30px"
                >
                    <StatBox
                        title={`Total Gifts - ${totalGift}`}
                        // subtitle1={`Total Amount - ₹ ${allTotalAmount}`}
                        // subtitle2={`Total Gifts - ₹ ${allTotalGift}`}
                        // progress="0.75"
                        // increase="+14%"
                        icon={
                            <CardGiftcardIcon
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
                   
                    <PieChart />
                </Box>
                {/* <Box
                    gridColumn="span 5"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                   
                    <PieForGift />
                    <LineChart />
                </Box> */}
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
                            ₹{singleEvent.totalAmount}
                            </Box>
                        </Box>
                    ))}
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
                            All Events - Total Gift
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
                                {singleEvent.totalGift}
                            </Box>
                        </Box>
                    ))}
                </Box>
                
 {/* ROW 3 */}
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
                            {`₹ ${totalAmount}`}
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
                    <Box display="flex" flexDirection="column" padding="10px">
                    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Entries more than Given Amount
                        </Typography><br />
                  <TextField type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="filter amount" />
                  <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >

                        {/* <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Entries more than {inputValue}
                        </Typography> */}
                    </Box>
                    {filteredEntries.map((singleEntry, i) => (
                        <Box
                            key={`${singleEntry.entryId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                                    {singleEntry.personName}
                                </Typography>
                                {/* <Typography color={colors.grey[100]}>
                                    {transaction.eventName}
                                </Typography> */}
                            </Box>
                            <Box color={colors.grey[100]}>
                                {singleEntry.city}
                            </Box>
                            <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                            ₹{singleEntry.amount}
                            </Box>
                        </Box>
                    ))}
                    </Box>
                </Box>


            </Box>
        </Box >

    );
};

export default Dashboard;