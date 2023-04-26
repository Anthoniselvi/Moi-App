import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import { RefreshContext } from "./index";

export default function NewDeletePopUp({ partId, open, status, onClose }) {
  console.log("Part ID recd in NewDeletePopup : " + partId);
  const { updateRefreshCount } = useContext(RefreshContext);

  function refreshPage() {
    // window.location.reload(false);
    updateRefreshCount();
  }
  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/parts/${partId}`).then((response) => {
      console.log("Deleted Parts :" + JSON.stringify(response));
    });
    onClose();
    refreshPage();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Part ID : {partId}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure want to Delete?</DialogContentText>
          <br />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="secondary" variant="contained" onClick={handleClose}>No</Button>
          <Button type="submit" color="secondary" variant="contained" onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
