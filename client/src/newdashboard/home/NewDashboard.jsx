import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box , Typography, useMediaQuery, IconButton, TextField} from '@mui/material'
import SidebarDrawer from './SidebarDrawer'
import axios from 'axios';
import StatBox1 from '../../components/StatBox1';
import StatBox2 from '../../components/StatBox2';
import StatBox3 from '../../components/StatBox3';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import NewSearchTable from '../../components/NewSearchTable';
import NewEventsTable from '../../components/NewEventsTable';
import NewBar from '../../components/NewBar';
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import NewFilterTable from '../../components/NewFilterTable';
import { useUserAuth } from '../../auth';
import image from "../../img/bg1.png"
import NewSearch from '../../components/NewSearch';
import NewSidebar from '../../scenes/global/NewSidebar';

const drawerWidth = 240;

export default function NewDashboard() {
    const auth = useUserAuth()
    const navigate = useNavigate()
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");
    const [eventsList, setEventsList] = useState([])
    const [allEntries, setAllEntries] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalGift, setTotalGift] = useState(0)
    const [maxAmount, setMaxAmount] = useState({})
    const [maxAmountEvent, setMaxAmountEvent] = useState({})
    const [inputValue, setInputValue] = useState("")
    const [searchName, setSearchName] = useState("")
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [filterSearch, setFilterSearch] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const handleFilterClick = () => {
      setFilterSearch(true);
    };

    const handleSearchClick = () => {
        setShowSearch(true);
      };
    const moreThanAmount = allEntries.filter(entry => entry.amount > 10000);

console.log("Amount more than 10000: " + JSON.stringify(moreThanAmount)); 

const filteredEntries = allEntries.filter(entry => entry.amount >= inputValue);

console.log("filteredEntries more than " + inputValue + ":" + JSON.stringify(filteredEntries));


const searchResult = allEntries.filter(entry => entry.personName && entry.personName.toLowerCase().includes(searchName.toLowerCase()));

console.log("Searched by Name - " + searchName + ":" + JSON.stringify(searchResult));

const navigateToEvents = () => {
    navigate(`/newhome?profile=${profileId}`)
}


    const fetchTotals = () => {
        console.log("Process.env in dashboard : " + JSON.stringify(process.env))
        axios.get(`${process.env.REACT_APP_BASE_URL}/entries/total/${profileId}`).then((response) => {
          // console.log(response);
         
          console.log("Totals : " + JSON.stringify(response.data));
         setEventsList(response.data)
     
        });
      };
      const fetchAllEntriesByProfileId = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/entries/allentries/${profileId}`).then((response) => {
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

      <Box margin="0px">
      
        <Box sx={{width: "100%", height: "40vh", marginTop: "-20px", background: `url(${image})`, backgroundSize: "cover",backgroundRepeat: "no-repeat", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <h1>Welcome {auth.user.displayName} !</h1>
        </Box>
      
      <Box
    //   bgcolor="#fff"
          p="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          justifyContent="space-between"
          gridAutoRows="90px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
                  }}
        >
            {/* <Box m="20px 0px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="90px"
                gap="20px"
            > */}
                {/* ROW 1 */}
                <Box onClick={navigateToEvents}
                    gridColumn="span 4"
                    bgcolor="#fff"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"      
                    border= "1px solid #e8ecf1"            
                >
                    <StatBox1
                        title1={eventsList.length}
                        subtitle1="Events"                     
                        icon1={                            
                            <AllInboxIcon
                                sx={{ color: "rgb(140, 141, 255)", fontSize: "24px"}}
                            />                           
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    bgcolor="#fff"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    // paddingTop="30px"
                    borderRadius="10px"
                    border= "1px solid #e8ecf1"  
                >
                    <StatBox2
                        title2={`₹ ${totalAmount}`}
                        // subtitle1={`Maximum Amount - ₹ ${maxAmount.amount}`}
                        subtitle1="Amount"
                        // progress="0.75"
                        // increase="+14%"
                        icon2={
                            <CurrencyRupeeIcon
                                sx={{ color: "rgb(255, 198, 117)", fontSize: "24px" }}
                            />
                        }
                    />
                </Box>   
                <Box
                    gridColumn="span 4"
                    bgcolor="#fff"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    // paddingTop="30px"
                    borderRadius="10px"
                    border= "1px solid #e8ecf1"  
                >
                    <StatBox3
                        title3={`${totalGift}`}
                        // subtitle1={`Total Amount - ₹ ${allTotalAmount}`}
                        subtitle1="Gifts"
                        // progress="0.75"
                        // increase="+14%"
                        icon3={
                            <CardGiftcardIcon
                                sx={{ color: "rgb(36, 153, 239)", fontSize: "24px" }}
                            />
                        }
                    />
                </Box>
                {/* ROW 2 */}
                <Box onClick={navigateToEvents}
                    gridColumn="span 12"
                    gridRow="span 3"
                    bgcolor="#fff"
                    borderRadius="10px"
                    border= "1px solid #e8ecf1"  
                    width="100%"
                    padding="20px"
                >
                  
                        <Box>
                            <Typography variant="h5" fontWeight="600" color="rgba(54, 162, 235)">
                                Events Generated
                            </Typography>
                            <Typography variant="h3" fontWeight="500" color="rgba(255, 159, 64)">
                            {`₹ ${totalAmount}`}
                            </Typography>
                        </Box>
                <Box sx={{width: "100%", height: "80%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    
                    <NewBar eventsList={eventsList} sx={{width: "100%"}} />
                    </Box>

                </Box>
                {/* <Box
                   gridColumn="span 6"
                   gridRow="span 3"
                   backgroundColor="#fff"
                //    overflow="auto"
                   borderRadius="10px"
                    border= "1px solid #e8ecf1"  
                  
                > 
                <Box display="flex" flexDirection="column" padding="10px">
                {!showSearch ? (<Box display="flex" justifyContent="space-between" alignItems="center" padding= "10px">
                    <Typography variant="h5" fontWeight="600" sx={{color: "rgba(39, 206, 136)", cursor: "pointer"}}>Search by Name</Typography>
                <IconButton sx={{backgroundColor: "rgba(39, 206, 136, 0.2)"}} onClick={handleSearchClick}>
    <SearchIcon sx={{color: "rgba(39, 206, 136)"}}/>
  </IconButton></Box>) :
  <TextField type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search by Name" sx={{color: "black"}}/>}
                    <NewSearchTable searchResult={searchResult} eventsList={eventsList} width="100%" />
                    {/* <NewSearch searchResult={searchResult} /> 
                    </Box>
                                 </Box> */}
                                 <Box
                   gridColumn="span 6"
                   gridRow="span 4"
                   backgroundColor="#fff"
                //    overflow="auto"
                   borderRadius="10px"
                    border= "1px solid #e8ecf1"  
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
                      }}
                  
                > 
                <Box display="flex" flexDirection="column" padding="10px">
                {/* {!showSearch ? (<Box display="flex" justifyContent="space-between" alignItems="center" padding= "10px">
                    <Typography variant="h5" fontWeight="600" sx={{color: "rgba(39, 206, 136)", cursor: "pointer"}}>Search by Name</Typography>
                <IconButton sx={{backgroundColor: "rgba(39, 206, 136, 0.2)"}} onClick={handleSearchClick}>
    <SearchIcon sx={{color: "rgba(39, 206, 136)"}}/>
  </IconButton></Box>) :
  <TextField type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search by Name" sx={{color: "black"}}/>} */}
                    {/* <NewSearchTable searchResult={searchResult} eventsList={eventsList} width="100%" /> */}
                    <NewSearch searchResult={searchResult} eventsList={eventsList}/>
                    </Box>
                                 </Box>

        </Box >
       
    </Box>
    // </Box>
  )
}
