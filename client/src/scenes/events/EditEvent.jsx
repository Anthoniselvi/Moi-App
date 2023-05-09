import * as React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useMediaQuery } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";


import { RefreshContext } from "./index";

export default function EditEvent({ open, onClose, eventId }) {
  
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
 
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  // const navigate = useNavigate();

  // const [searchParam] = useSearchParams();
  // const eventId = searchParam.get("event");
  const [refreshCount, setRefreshCount] = useState(0);
  const { updateRefreshCount } = useContext(RefreshContext);
  // const updateRefreshCount = () => {
  //   setRefreshCount(refreshCount + 1);
  // };
  //   const { updateRefreshCount = () => {} } = useContext(RefreshContext);
  function refreshPage() {
    updateRefreshCount();
  }

  const handleEditSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:1234/events/edit/${eventId}`, {
        eventType : eventType,
        name: name,
        place: place,
        date: date,
      })
      .then((response) => {
        console.log("Updated Event : " + JSON.stringify(response));
      });
    onClose();
    refreshPage();
  };

  const getSelectedEvent = () => {
    axios.get(`http://localhost:1234/events/single/${eventId}`).then((response) => {
      // console.log(response);
     
      console.log("Totals : " + JSON.stringify(response.data));
      setEventType(response.data.eventType);
      setName(response.data.name);
      setPlace(response.data.place);
      setDate(response.data.date);
    });
  };
  useEffect(() => {
   
    getSelectedEvent()
  }, [refreshCount]);
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle textAlign="center" variant="h4">Edit</DialogTitle>
        <DialogContent>
        <form>
          {/* <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Event Type"
            variant="outlined"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          /> */}
          <br />
          <FormControl sx={{ width: "300px" , "& > div": { width: isNonMobile ? undefined : "250px"} }}>
          <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            required
            value={eventType}
            label="Event Type"
            onChange={
              (e) => setEventType(e.target.value)
              // (e) => setImageSource(images[e.target.value]))
            }
          >
            <MenuItem value="wedding">Wedding</MenuItem>
            <MenuItem value="birthday">Birthday</MenuItem>
            <MenuItem value="baby">Baby Shower</MenuItem>
            <MenuItem value="house">House Warming</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
          <br />
          <br />
          <TextField
            sx={{ width: "300px", margin: "5px" , "& > div": { width: isNonMobile ? undefined : "250px"} }}
            type="text"
            label="Event Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            sx={{ width: "300px", margin: "5px", "& > div": { width: isNonMobile ? undefined : "250px"}  }}
            type="text"
            label="Place"
            variant="outlined"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <br />
          <br />
          <TextField
            sx={{ width: "300px", margin: "5px", "& > div": { width: isNonMobile ? undefined : "250px"}  }}
            type="date"
            label="Date"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <br />
        </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="secondary" variant="contained" onClick={onClose}>CANCEL</Button>
          <Button type="submit" color="secondary" variant="contained" onClick={handleEditSave}>EDIT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
