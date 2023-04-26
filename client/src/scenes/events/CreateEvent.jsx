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
import { RefreshContext } from "./index";
export default function CreateNewParts({ open, columns, onClose, onSubmit }) {
  // const [parts, setParts] = useState([]);

  const [part_number, setPart_Number] = useState();
  const [part_name, setPart_Name] = useState();
  const { updateRefreshCount } = useContext(RefreshContext);

  function refreshPage() {
    // window.location.reload(false);
    updateRefreshCount();
  }

  const handleClose = () => {
    onClose();
    setPart_Name("");
    setPart_Number("");
  };
  const handleSubmit = (e) => {
    //put your validation logic here
    // onSubmit(values);

    e.preventDefault();

    axios
      .post("http://localhost:5000/parts", {
        part_number: part_number,
        part_name: part_name,
      })
      .then((response) => {
        console.log("Post new Parts Response : " + JSON.stringify(response));
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.error
          : "Unable to connect to server";
        alert(errorMessage);
      });
    onClose();
    setPart_Name("");
    setPart_Number("");
    refreshPage();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add New Parts</DialogTitle>
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
