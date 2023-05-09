import { Box, Button, MenuItem, useTheme, Typography, IconButton, useMediaQuery } from "@mui/material";
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
import { Download } from "@mui/icons-material";


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
    const [loading, setLoading] = useState(false);
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
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
      setLoading(true)
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
  <Box
    display="flex"
    flexDirection="column"
    gap="20vh"
    width={{ xs: "100%", md: "500px" }} // Increase width to 500px on non-mobile screens
    sx={{ "& > div": { width: isNonMobile ? undefined : "200px" } }}
  >
    <Header title="REPORTS" />
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap="20px" // Decrease gap to 20px
      alignItems="left" // Align form and button in center
    >
      <form style={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" color="secondary">
            Event Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            required
            variant="outlined"
            color="secondary"
            value={eventName}
            label="Event Type"
            onChange={(e) => setEventName(e.target.value)}
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
      <Button
        sx={{ backgroundColor: "rgb(25, 107, 167)", minWidth: "120px" }} // Set a minimum width of 120px for the button
        type="submit"
        variant="contained"
        onClick={() => getReports(eventName)}
      >
        Create
      </Button>
    </Box>
  </Box>
  {/* {selectedEntries ? ( <DownloadEntries selectedEntries={selectedEntries} selectedEvent={selectedEvent} />) : null} */}
  {!loading ? null : (
    <>
      <p style={{ color: colors.greenAccent[500] }}>Ready to Download</p>
      <PDFDownloadLink
        document={<EntriesPdf selectedEntries={selectedEntries} selectedEvent={selectedEvent} />}
        fileName={`${selectedEvent.name}.pdf`}
      >
        <IconButton>
          <Download sx={{ color: "#fff", fontSize: 35 }} />
        </IconButton>
      </PDFDownloadLink>
    </>
  )}
</Box>


    );
};

export default Reports;

