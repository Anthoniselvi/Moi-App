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

  const [part_number, setPart_Number] = useState(row.part_number);
  const [part_name, setPart_Name] = useState(row.part_name);
  const { updateRefreshCount } = useContext(RefreshContext);
  //   const { updateRefreshCount = () => {} } = useContext(RefreshContext);
  function refreshPage() {
    updateRefreshCount();
  }

  const handleEditSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/parts/${row.id}`, {
        part_number: part_number,
        part_name: part_name,
      })
      .then((response) => {
        console.log("Updated Parts : " + JSON.stringify(response));
      });
    onClose();
    refreshPage();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Part No : {row.id}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              style={{ width: "300px", margin: "5px" }}
              type="text"
              label="Part Number"
              variant="outlined"
              value={part_number}
              onChange={(e) => setPart_Number(e.target.value)}
            />

            <br />
            <br />
            <TextField
              style={{ width: "300px", margin: "5px" }}
              type="text"
              label="Part Name"
              variant="outlined"
              value={part_name}
              onChange={(e) => setPart_Name(e.target.value)}
            />
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
