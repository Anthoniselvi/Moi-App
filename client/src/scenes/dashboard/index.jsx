import { Box, Button, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import InputBase from "@mui/material/InputBase";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import Header from "../../components/Header";

import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";

import { useNavigate, useSearchParams } from "react-router-dom";
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
    const navigate = useNavigate()
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");
    const [eventsList, setEventsList] = useState([])
    const [allEntries, setAllEntries] = useState([])
    const [totalAmount, setTotalAmount] = useState()
    const [totalGift, setTotalGift] = useState()
    const [maxAmount, setMaxAmount] = useState({})
    const [maxAmountEvent, setMaxAmountEvent] = useState({})
    const [inputValue, setInputValue] = useState(0)
    const [searchName, setSearchName] = useState("")
    const [createModalOpen, setCreateModalOpen] = useState(false);
   
    const moreThanAmount = allEntries.filter(entry => entry.amount > 10000);

console.log("Amount more than 10000: " + JSON.stringify(moreThanAmount)); 

const filteredEntries = allEntries.filter(entry => entry.amount >= inputValue);

console.log("filteredEntries more than " + inputValue + ":" + JSON.stringify(filteredEntries));


const searchResult = allEntries.filter(entry => entry.personName && entry.personName.toLowerCase().includes(searchName.toLowerCase()));

console.log("Searched by Name - " + searchName + ":" + JSON.stringify(searchResult));

const navigateToEvents = () => {
    navigate(`/events?profile=${profileId}`)
}

const navigateToEntriesList = (eventId) => {
    navigate(`/entriesList?event=${eventId}`)
}

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
                <Header title="DASHBOARD"  />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => setCreateModalOpen(true)}
           
                    >
                        <AddIcon sx={{ mr: "10px" }} />
                        New
                    </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box m="20px 0px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box onClick={navigateToEvents}
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"                  
                >
                    <StatBox
                        title={eventsList.length}
                        subtitle1="Events"                     
                        icon={                            
                            <AllInboxIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "24px"}}
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
                    // paddingTop="30px"
                    borderRadius="10px"
                >
                    <StatBox
                        title={`₹ ${totalAmount}`}
                        // subtitle1={`Maximum Amount - ₹ ${maxAmount.amount}`}
                        subtitle1="Amount"
                        // progress="0.75"
                        // increase="+14%"
                        icon={
                            <CurrencyRupeeIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "24px" }}
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
                    // paddingTop="30px"
                    borderRadius="10px"
                >
                    <StatBox
                        title={`${totalGift}`}
                        // subtitle1={`Total Amount - ₹ ${allTotalAmount}`}
                        subtitle1="Gifts"
                        // progress="0.75"
                        // increase="+14%"
                        icon={
                            <CardGiftcardIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "24px" }}
                            />
                        }
                    />
                </Box>
                {/* ROW 2 */}
                <Box
                   gridColumn="span 4"
                   gridRow="span 2"
                   backgroundColor={colors.primary[400]}
                   overflow="auto"
                   borderRadius="10px"
                  
                >
                    <Box display="flex" flexDirection="column" padding="10px">
                    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Search by Name
                        </Typography><br />
                   <TextField type="text" value={searchName} onChange={(e)=>setSearchName(e.target.value)} placeholder="Search by Name" />
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
                    {/* {searchName && ( */}
                        <Box>
                    {searchResult.map((entry) => (
                        <Box
                        key={entry.entryId}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                                    {entry.personName}
                                </Typography>
                                {/* <Typography color={colors.grey[100]}>
                                    {transaction.eventName}
                                </Typography> */}
                            </Box>
                            <Box color={colors.grey[100]}>
                            {entry.city}
                            </Box>
                            <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                            ₹{entry.amount}
                            </Box>
                        </Box>
                    ))}</Box>
              </Box>
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
                    borderRadius="10px"
                >

                    <Box onClick={navigateToEvents}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >

                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Events
                        </Typography>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Amount
                        </Typography>
                    </Box>
                    {eventsList.map((singleEvent, i) => (
                        <Box onClick={()=>navigateToEntriesList(singleEvent.eventId)}
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
                    borderRadius="10px"
                >

                    <Box onClick={navigateToEvents}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >

<Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Events
                        </Typography>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Gifts
                        </Typography>
                    </Box>
                    {eventsList.map((singleEvent, i) => (
                        <Box onClick={()=>navigateToEntriesList(singleEvent.eventId)}
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
                <Box onClick={navigateToEvents}
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                >
                    <Box
                        mt="25px"
                        // p="0 30px"
                        paddingLeft="30px"
                        width="100%"
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
                    <Box height="250px" mt="-20px" width="100%">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>

                <Box
                   gridColumn="span 4"
                   gridRow="span 2"
                   backgroundColor={colors.primary[400]}
                   overflow="auto"
                   borderRadius="10px"
                  
                >
                    <Box display="flex" flexDirection="column" padding="10px">
                    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Filter by Value
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