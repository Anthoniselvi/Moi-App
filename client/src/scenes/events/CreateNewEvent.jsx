import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "date-fns";
import { useNavigate,useSearchParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { RefreshContext } from "./index";

export default function CreateNewEvent({ open, columns, onClose, onSubmit }) {
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  const { updateRefreshCount } = useContext(RefreshContext);

  function refreshPage() {
    // window.location.reload(false);
    updateRefreshCount();
  }

  const handleClose = () => {
    onClose();
    setEventType("");
    setName("");
    setPlace("");
    setDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1234/events/add", {
        // eventId: eventId,
        eventType: eventType,
        name: name,
        place: place,
        date: date,
        profileId: profileId,
      })
      .then((response) => {
        console.log(response);
        // navigate(`/events?profile=${profileId}`);
      });
      onClose();
    setEventType("");
    setName("");
    setPlace("");
    setDate("");  
  
    refreshPage();
  };


  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create Event</DialogTitle>
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
           <FormControl sx={{ width: "300px" }}>
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
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Event Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Place"
            variant="outlined"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <br />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
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
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button type="submit" color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
        <Button type="submit" color="secondary" variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}