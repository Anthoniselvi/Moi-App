import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { tokens } from "../../theme";

import { useTheme} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, Edit } from "@mui/icons-material";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";


export default function EditOrDelete({ eventId }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
 
  const [selectedRowId, setSelectedRowId] = useState();
  const open = Boolean(anchorEl);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteEvent = (eventId) => {
    setAnchorEl(null)
    setDeleteModalOpen(true);
    setSelectedRowId(eventId);
  };
  
  const handleEditEvent = (eventId) => {
  setAnchorEl(null)
    setEditModalOpen(true);
    setSelectedRowId(eventId);
  };
  return (
    <div>
      <Button
   sx={{color: colors.blueAccent[800]}}
        id="basic-button"
        // variant="contained"
        color="secondary"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
     
      >
        <MoreVertIcon />
       
      </Button>
      <Menu display="flex" flexDirection="column"       id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Button style={{color: "#fff"}} onClick={() => handleEditEvent(eventId)}>  <div style={{display: "flex", gap: "5px"}}>  <Edit /> EDIT </div>
      </Button><br />
      <Button style={{color: "#fff"}} onClick={() => handleDeleteEvent(eventId)}>  <div style={{display: "flex", gap: "5px"}}>  <Delete /> DELETE </div>
      </Button>
   
      </Menu>
      {editModalOpen ? (
            <EditEvent
              eventId={eventId}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
          {deleteModalOpen ? (
            <DeleteEvent
              eventId={eventId}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
            />
          ) : (
            <></>
          )}
    </div>
  );
}
