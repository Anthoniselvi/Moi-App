import { Box, Button, MenuItem, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState , useEffect} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DownloadEntries, { EntriesPdf } from "./DownloadEntries";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";


const Reports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [eventName, setEventName] = useState("")
    const [eventsArray, setEventsArray] = useState([])
    const [entriesArray, setEntriesArray] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({})
    const [selectedEntries, setSelectedEntries] = useState([])
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");

   
    const getReports = (eventName) => {
      console.log("Button Clicked " + eventName)
      // Find the event object that matches the selected event name
      console.log("Events Array :" + JSON.stringify(eventsArray))
      const selectedEvent = eventsArray.find((event) => event.name === eventName);
    setSelectedEvent(selectedEvent)
      console.log("Selected Event :" + JSON.stringify(selectedEvent))
      // Get the eventId of the selected event
      const selectedEventId = selectedEvent.eventId;

    console.log("Selected EventId : " + selectedEventId)
      // Filter the entriesList to get the entries for the selected event
      console.log("Entries Array : " + JSON.stringify(entriesArray))
      const selectedEventEntries = entriesArray.filter((entry) => entry.eventId === selectedEventId);
    setSelectedEntries(selectedEventEntries)
      console.log("Entries for selected event:", selectedEntries);
    };
    console.log("Entries for selected event:", selectedEntries);
     

    const getAllEvents = () => {
      axios.get(`http://localhost:1234/events/all/${profileId}`).then((response) => {
        // console.log(response);
       
        console.log("All Events from ProfileId : " + JSON.stringify(response.data));
       setEventsArray(response.data)
      });
    };
   
    const getAllEntries = () => {
      axios.get(`http://localhost:1234/entries/allentries/${profileId}`).then((response) => {
        // console.log(response);
       
        console.log("All Entries from ProfileId : " + JSON.stringify(response.data));
       setEntriesArray(response.data.entriesList)
       
      });
    };

    useEffect(() => {      
   getAllEvents()
   getAllEntries()
    }, []);

    return (
        <Box m="20px">
         
            <Box display="flex" flexDirection="column" gap="20vh" width="500px">
                <Header title="REPORTS"  />              
  <form>
      
      <br />
       <FormControl sx={{ width: "300px" }}>
      <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        required
        value={eventName}
        label="Event Type"
        onChange={
          (e) => setEventName(e.target.value)
        }
      >
          <MenuItem value="">Select Event</MenuItem>
        {eventsArray.map((singleEvent) => (
          <MenuItem key={singleEvent.eventId} value={singleEvent.name}>
            {singleEvent.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    
    </form>
    <Button type="submit" color="secondary" variant="contained" onClick={() => getReports(eventName)}
     
    >
      Submit
    </Button>
            </Box>
            {/* {selectedEntries ? ( <DownloadEntries selectedEntries={selectedEntries} selectedEvent={selectedEvent} />) : null} */}
            {selectedEntries ?     <PDFDownloadLink
        document={<EntriesPdf selectedEntries={selectedEntries} selectedEvent={selectedEvent} />}
        fileName={`${selectedEvent.name}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink> : null}
                    
        </Box >

    );
};

export default Reports;

