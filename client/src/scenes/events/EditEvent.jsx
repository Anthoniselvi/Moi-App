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

export default function NewEditPart({ open, columns, onClose, onSubmit, row }) {
  
  console.log("selected Row in NewEditPart: " + JSON.stringify(row));

  const [eventType, setEventType] = useState("");
  const [name, setName] = useState();
  const [place, setPlace] = useState();
  const [date, setDate] = useState();
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
    // e.preventDefault();
    // axios
    //   .put(`http://localhost:5000/parts/${row.id}`, {
    //     part_number: part_number,
    //     part_name: part_name,
    //   })
    //   .then((response) => {
    //     console.log("Updated Parts : " + JSON.stringify(response));
    //   });
    // onClose();
    // refreshPage();
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
            label="Event Type"
            variant="outlined"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          />
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
        <DialogActions>
          <Button type="submit" color="secondary" variant="contained" onClick={onClose}>CANCEL</Button>
          <Button type="submit" color="secondary" variant="contained" onClick={handleEditSave}>EDIT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
