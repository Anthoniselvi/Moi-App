import * as React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";


import { RefreshContext } from "./index";

export default function EditEntry({ open,  onClose,  row }) {
  
  console.log("selected Row in NewEditPart: " + JSON.stringify(row));

  const [personName, setPersonName] = useState(row.personName);
  const [city, setCity] = useState(row.city);
  const [amount, setAmount] = useState(row.amount);
  const [gift, setGift] = useState(row.gift);
  const [presentType, setPresentType] = useState(row.presentType);
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  // const navigate = useNavigate();

  // const [searchParam] = useSearchParams();
  // const eventId = searchParam.get("event");
  const { updateRefreshCount } = useContext(RefreshContext);
  //   const { updateRefreshCount = () => {} } = useContext(RefreshContext);
  function refreshPage() {
    updateRefreshCount();
  }

  const handleEditSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:1234/entries/edit/${row.entryId}`, {
        personName: personName,
        city: city,
        presentType: presentType,
        amount: amount,
        gift: gift,
       
      })
      .then((response) => {
        console.log("Updated Entry : " + JSON.stringify(response));
      });
    onClose();
    refreshPage();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Event - {row.name}</DialogTitle>
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
        <DialogActions>
          <Button type="submit" color="secondary" variant="contained" onClick={onClose}>CANCEL</Button>
          <Button type="submit" color="secondary" variant="contained" onClick={handleEditSave}>EDIT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
