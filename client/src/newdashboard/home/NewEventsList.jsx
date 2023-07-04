import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import axios from 'axios';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EditIcon from '@mui/icons-material/Edit';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, backgroundColor: '#fff' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NewEventsList({eventslist}) {
  const [value, setValue] = React.useState(0);
const navigate = useNavigate()
const [searchParam] = useSearchParams();
const profileId = searchParam.get("profile");
const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigateToSingleEventPage = (eventId) => {
    navigate(`/eventpage?event=${eventId}`)
  }
const navigateToCreateEvent = () => {
  navigate(`/newevent?profile=${profileId}`)
}

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box >
      <Tabs
  value={value}
  onChange={handleChange}
  aria-label="basic tabs example"
  sx={{
    '& .MuiButtonBase-root': {
      color: '#101a34',
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '17px',
    },
    '& .Mui-selected': {
      borderBottom: '2px solid #FE956F',
      color: '#101a34', 
      // textDecoration: "underline",
      // textDecorationColor: "#FE956F",
    },
    '& .MuiButtonBase-root-MuiTab-root.Mui-selected' :{
      color: "#101a34",
    
    },
    '& .MuiTab-root.Mui-selected' :{
      color: "#101a34",
    
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'transparent',
    },
  }}
>
  <Tab label={`Events (${eventslist.length})`} {...a11yProps(0)} />
  {/* <Tab label={`Past (${eventslist.length})`} {...a11yProps(1)} /> */}
</Tabs>

      </Box>
      <TabPanel value={value} index={0} sx={{ color: 'black', backgroundColor: '#fff', }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            // gap: '20px',
          //  padding: "20px"
          }}
        >
          <Box onClick={navigateToCreateEvent}
            sx={{
              height: '300px',
              width: '30%',
              // height: '200px',
              // width: '200px',
              border: '1px solid #cad3dd',
              borderRadius: '10px',
              display: 'flex',
              gap: '5%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                // bgcolor: '#FE956F',
                backgroundColor: "rgb(140, 141, 255)",
                color: '#ffffff',
                '& .MuiTypography-root, & .MuiSvgIcon-root': {
                  color: '#ffffff',
                },
              },
            }}
          >
            <ControlPointIcon sx={{ fontSize: '40px',color: "rgb(140, 141, 255)" }} />
            {/* color: '#FE956F',  */}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '17px',
                lineHeight: '22px',
                fontFamily: 'Poppins',
                color: '#101a34',
              }}
            >
              Create a new Event
            </Typography>
          </Box>
        
          {eventslist.map((singleEvent, eventId) => (
            <>
      {eventslist.length > 0 && (
             <>
          <Box  onClick= {()=>navigateToSingleEventPage(singleEvent.eventId)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
            sx={{
              height: '300px',
              width: '30%',
              border: '1px solid #cad3dd',
              borderRadius: '10px',
              display: 'flex',
              marginBottom: '5%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                // bgcolor: '#FE956F',
                backgroundColor: "rgb(140, 141, 255)",
                color: '#ffffff',
                '& .MuiTypography-root, & .MuiSvgIcon-root': {
                  color: '#ffffff',
                },
              },
            }}
          >
       
  <div style={{ overflow: 'hidden', width: '100%',
        height: '65%',
        backgroundImage: `url(${singleEvent.eventImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover', borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
   
  </div>

            <Box  onClick= {()=>navigateToSingleEventPage(singleEvent.eventId)} padding="0% 5%" width="100%" height="35%" display="flex" flexDirection="column" gap="20%" alignItems="left" justifyContent="center" >
               
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '15px',
                lineHeight: '20px',
                fontFamily: 'Poppins',
                color: '#101a34',
                
              }}
            >
                {singleEvent.eventName}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap="5px">
            <CurrencyRupeeIcon sx={{ fontSize: "20px", color:'#d3133b',  }} />  
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '17px',
                lineHeight: '22px',
                fontFamily: 'Poppins',
                // color: '#101a34',
                color: "#d3133b"
              }}
            >
               {singleEvent.totalAmount}
            </Typography></Box>
            <Box display="flex" alignItems="center" gap="5px">
            <CardGiftcardIcon sx={{ fontSize: "20px", color: '#d3133b',}} /> 
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '17px',
                lineHeight: '22px',
                fontFamily: 'Poppins',
                // color: '#101a34',
                color: "#d3133b"
              }}
            >
               {singleEvent.totalGift}
            </Typography></Box>
            </Box>
            </Box>
          
  </Box>
         {isHovered && (
          <EditIcon
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              // Add any additional styles for the edit icon
            }}
          />
        )}
        </>
        )}</>))}
       
        </Box>
      </TabPanel>
     
    </Box>
  );
}
