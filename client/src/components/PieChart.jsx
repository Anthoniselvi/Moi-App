import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const PieChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [eventsList, setEventsList] = useState([])
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");

    const data = eventsList.map((event) => ({
        id: event.eventName,
        value: event.totalAmount,
      }));

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
        <ResponsivePie
        data={data}
        theme={{
          textColor: '#fff',
        }}
        margin={{ top: 80, right: 100, bottom: 100, left: 110 }}
      
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'pastel1' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
      />
    );
};

export default PieChart;
