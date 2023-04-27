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

import { RefreshContext } from "./index";

export default function CreateNewEntry({ open, onClose, eventId }) {
    const [personName, setPersonName] = useState();
    const [city, setCity] = useState();
    const [amount, setAmount] = useState(0);
    const [gift, setGift] = useState("");
    const [presentType, setPresentType] = useState("");
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
    setPersonName("");
    setCity("");
    setPresentType("");
    setAmount("");
    setGift("");
  };

  const handleSubmit = (e, eventId) => {
    e.preventDefault();
    axios
      .post("http://localhost:1234/entries/add", {
        
        personName: personName,
        city: city,
        presentType: presentType,
        amount: amount,
        gift: gift,
        eventId: eventId
      })
      .then((response) => {
        console.log(response);
        console.log("Created New Entry: " + response.data)
      });
      onClose();
      setPersonName("");
      setCity("");
      setPresentType("");
      setAmount("");
      setGift("");
  
      refreshPage();
  };
 
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create Event</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Person Name"
            variant="outlined"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Present Type"
            variant="outlined"
            value={presentType}
            onChange={(e) => setPresentType(e.target.value)}
          />
          <br />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="number"
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Gift"
            variant="outlined"
            value={gift}
            onChange={(e) => setGift(e.target.value)}
          />
          <br />
          <br />
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button type="submit" color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
        <Button type="submit" color="secondary" variant="contained" onClick={(e)=>handleSubmit(e,eventId)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
