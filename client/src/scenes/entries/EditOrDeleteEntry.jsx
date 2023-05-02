import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { tokens } from "../../theme";

import { useTheme} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, Edit } from "@mui/icons-material";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";


export default function EditOrDelete({ entryId }) {
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

  const handleDeleteEntry = (entryId) => {
    setAnchorEl(null)
    setDeleteModalOpen(true);
    setSelectedRowId(entryId);
  };
  
  const handleEditEntry = (entryId) => {
  setAnchorEl(null)
    setEditModalOpen(true);
    setSelectedRowId(entryId);
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
        <MoreVertIcon style={{color: "white"}} />
       
      </Button>
      <Menu display="flex" flexDirection="column" id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Button style={{color: "#fff"}} onClick={() => handleEditEntry(entryId)}>  <div style={{display: "flex", gap: "5px"}}>  <Edit /> EDIT </div>
      </Button><br />
      <Button style={{color: "#fff"}} onClick={() => handleDeleteEntry(entryId)}>  <div style={{display: "flex", gap: "5px"}}>  <Delete /> DELETE </div>
      </Button>
   
      </Menu>
      {editModalOpen ? (
            <EditEntry
              entryId={entryId}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
          {deleteModalOpen ? (
            <DeleteEntry
            entryId={entryId}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
            />
          ) : (
            <></>
          )}
    </div>
  );
}
