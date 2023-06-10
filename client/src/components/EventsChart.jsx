
import { ResponsiveFunnel } from '@nivo/funnel'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const EventsChart = () => {
    const [eventsList, setEventsList] = useState([])
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");

    const data = eventsList.map(event => ({
        id: event.eventId,
        value: event.totalAmount,
        label: event.eventName
      }));
      

    const fetchTotals = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/entries/total/${profileId}`).then((response) => {
          // console.log(response);
         
          console.log("Totals : " + JSON.stringify(response.data));
         setEventsList(response.data)
     
        });
      };
      useEffect(() => {
      
        fetchTotals()
      }, []);
    return(
    <ResponsiveFunnel
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.4s"
        colors={{ scheme: 'spectral' }}
        borderWidth={20}
        labelColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    3
                ]
            ]
        }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly"
    />
)
}
export default EventsChart;