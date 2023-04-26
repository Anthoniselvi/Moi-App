import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Header from "../../components/Header"
import { useNavigate, useSearchParams } from "react-router-dom";


const EventsList = () => {
  // const { data, isLoading } = useGetEventsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");
    const [eventslist, setEventsList] = useState([])
    const [entries, setEntries] = useState([])
    const navigate = useNavigate()

    const navigateToCreate = () => {
      navigate(`/events/new?profile=${profileId}`);
    }

    const fetchAllEvents = () => {
      axios
        .get(`http://localhost:1234/events/all/${profileId}`)
        .then((response) => {
          // console.log(response);
          console.log(response.data);
          setEventsList(response.data);
        });
    };
  
    // const fetchAllEntries = () => {
    //   axios.get("http://localhost:2010/entries").then((response) => {
    //     // console.log(response);
    //     console.log(response.data);
    //     setEntries(response.data);
    //   });
    // };
    useEffect(() => {
      fetchAllEvents();
      // fetchAllEntries();
    }, []);

  return (
    <Box>
       <Button onClick={navigateToCreate}>Create</Button>
    </Box>
  );
};

export default EventsList;