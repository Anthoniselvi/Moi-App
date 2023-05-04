import { Box, Button, MenuItem, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState , useEffect} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";


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
                {/* <Box onSubmit={handleSubmit} display="flex" flexDirection="column" gap="10vh">
    <FormControl focused={false} inputProps={{ style: { borderColor: '#FFF' } }} InputLabelProps={{ style: { color: '#FFF' } }}>
      <InputLabel id="demo-simple-select-label">Select Event</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        label="Event Name"
      >
        <MenuItem value="">Select Event</MenuItem>
        {eventsArray.map((singleEvent) => (
          <MenuItem key={singleEvent.eventId} value={singleEvent.name}>
            {singleEvent.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <Button
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '10px 20px',
      }}
      type="submit"
    >
      Submit
    </Button>
  </Box> */}
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
      // sx={{
      //   backgroundColor: colors.blueAccent[700],
      //   color: colors.grey[100],
      //   fontSize: '14px',
      //   fontWeight: 'bold',
      //   padding: '10px 20px',
      // }}
      // type="submit"
    >
      Submit
    </Button>
            </Box>
            {selectedEntries ? (
              <>
            <h1>{selectedEvent.name}</h1>
            {selectedEntries.map((singleEntry, i) => (
                        <Box
                            key={`${singleEntry.entryId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                                    {singleEntry.personName}
                                </Typography>
                               
                           </Box>
                            <Box color={colors.grey[100]}>
                                {singleEntry.city}
                            </Box>
                            <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                            ₹{singleEntry.amount}
                            </Box>
                            <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                            {singleEntry.gift}
                            </Box>
                        </Box>
                    ))} 
                    </>) : null}
                    
        </Box >

    );
};

export default Reports;