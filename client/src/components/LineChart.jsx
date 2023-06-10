import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockLineData as data } from "../data/mockData";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const LineChart = ({ isDashboard = false }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [eventsList, setEventsList] = useState([])
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");

    const chartData = eventsList.map((event) => ({
        id: event.eventName,
        data: [
          { x: 'totalAmount', y: event.totalAmount },
          { x: 'totalGift', y: event.totalGift },
        ],
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
    return (

        <ResponsiveLine
            data={chartData}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100]
                        }
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1
                        },
                        text: {
                            fill: colors.grey[100]
                        }
                    }
                },
                legends: {
                    text: {
                        fill: colors.grey[100]
                    }
                },
                tooltip: {
                    container: {
                        color: colors.primary[500],
                    }
                }
            }}
            colors={isDashboard ? {
                datum: "color"
            } : { scheme: "nivo" }}
            margin={{
                top: 50, right: 110, bottom: 50, left: 60
            }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={- 12}
            useMesh={true}
            legends={
                [
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
        />
    )
}


export default LineChart;