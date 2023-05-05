import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [eventsList, setEventsList] = useState([])
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");


    const chartData = eventsList.map(event => {
        return {
          id: event.eventName,
          totalAmount: event.totalAmount,
          // totalGift: event.totalGift
        };
      });
     
            
  
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
        <ResponsiveBar
        data={chartData}
        keys={['totalAmount']}
        indexBy='id'
        theme={{
            textColor: 'white',
          }}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#8dd3c7', '#bebada']}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Events',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Total',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        enableGridY={false}
        enableGridX={false}
        tooltip={({ id, value, color }) => (
          <div style={{ padding: '12px' }}>
            <div style={{ color }}>
              <strong>{id}</strong>
            </div>
            <div>₹{value}
            </div>           
          </div>
        )}
       
      />
    );
};

export default BarChart;
