import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import axios from 'axios';

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


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ bcolor: 'black' }}>
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
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Past" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} sx={{ color: 'black', backgroundColor: 'lightgray' }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            backgroundColor: '#fff',
          }}
        >
          <Box
            sx={{
              height: '200px',
              width: '200px',
              border: '1px solid #cad3dd',
              borderRadius: '10px',
              display: 'flex',
              gap: '5%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: '#FE956F',
                color: '#ffffff',
                '& .MuiTypography-root, & .MuiSvgIcon-root': {
                  color: '#ffffff',
                },
              },
            }}
          >
            <ControlPointIcon sx={{ fontSize: '40px', color: '#FE956F' }} />
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
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1} sx={{ color: 'black', backgroundColor: 'lightgray' }}>
      
      <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            backgroundColor: '#fff',
          }}
        >
          {eventslist.map((singleEvent, eventId) => (
            <>
      {eventslist.length > 0 && (
             
          <Box
            sx={{
              height: '200px',
              width: '200px',
              border: '1px solid #cad3dd',
              borderRadius: '10px',
              display: 'flex',
              gap: '5%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: '#FE956F',
                color: '#ffffff',
                '& .MuiTypography-root, & .MuiSvgIcon-root': {
                  color: '#ffffff',
                },
              },
            }}
          >
            <Box>image</Box>
            <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '17px',
                lineHeight: '22px',
                fontFamily: 'Poppins',
                color: '#101a34',
              }}
            >
                {singleEvent.eventName}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '17px',
                lineHeight: '22px',
                fontFamily: 'Poppins',
                color: '#101a34',
              }}
            >
               {singleEvent.totalAmount}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '17px',
                lineHeight: '22px',
                fontFamily: 'Poppins',
                color: '#101a34',
              }}
            >
               {singleEvent.totalGift}
            </Typography>
            </Box>
  </Box>
       
        )}</>))}
        </Box>
       
      </TabPanel>
    </Box>
  );
}
