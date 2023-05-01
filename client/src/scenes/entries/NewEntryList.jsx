

import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme} from "@mui/material";
import { Box} from "@mui/material";
import { useState, useEffect, createContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Avatar from "react-avatar";
// import NewEditPart from "./EditPart";
// import NewDeletePopUp from "./DeletePart";
// import CreateNewParts from "./CreatePart";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export const RefreshContext = createContext();

const NewEntryList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const [entries, setEntries] = useState([]);
 const [eventsList, setEventsList] = useState({})
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalGift, setTotalGift] = useState(0)
  const [refreshCount, setRefreshCount] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
 

  const handleClose = () => {
    setAnchorEl(null);
  };
  
    const updateRefreshCount = () => {
      setRefreshCount(refreshCount + 1);
    };
  
    // function refreshPage() {
    //   updateRefreshCount();
    // }
  
    const handleDeleteRow = (entryId) => {
      setDeleteModalOpen(true);
      setSelectedRowId(entryId);
    };
  
    const handleEditRow = (entryId) => {
      setEditModalOpen(true);
      setSelectedRowId(entryId);
    };

   
    const navigateToEventsPage = () => {
      axios.get(`http://localhost:1234/events/single/${eventId}`).then((response) => {
      // console.log(response);
     
      console.log("Totals : " + JSON.stringify(response.data));
      // setProfileId(response.data.profileId);
      navigate(`/events?profile=${response.data.profileId}`)
    });
   
    }
    const getSelectedEvent = () => {
        axios
          .get(`http://localhost:1234/events/single/${eventId}`)
          .then((response) => {
            // console.log(response);
            console.log(response.data);
            setEventsList(response.data);
          });
      };
    
      const fetchAllEntries = () => {
        axios.get(`http://localhost:1234/entries/all/${eventId}`).then((response) => {
          // console.log(response);
          // console.log("fetchAllEntries : " + JSON.stringify(response.data));
          console.log("fetchAllEntries : " + JSON.stringify(response.data.entriesList));
          console.log("totalAmount : " + JSON.stringify(response.data.totalAmount));
          setEntries(response.data.entriesList);
          setTotalAmount(response.data.totalAmount)
          setTotalGift(response.data.totalGift)
        });
      };
      useEffect(() => {
        getSelectedEvent();
        fetchAllEntries();
      }, [refreshCount]);
   

    return (
        <RefreshContext.Provider value={{ updateRefreshCount }}>
        <Box m="20px">
        <KeyboardBackspaceIcon onClick={navigateToEventsPage}/>
      
        <Box display="flex" flexDirection="column" alignContent="center" justifyContent="space-between" marginBottom="-4%">
                <Header title={eventsList.name}   />
                {entries.length > 0 && (
        <>
          {entries.map((entry) => (
                <Card
              sx={{ width: "100%" , backgroundColor: colors.primary[400]  }}
              // onClick={() => editEntry(entry.entryId)}
            >
              {entry.presentType === "amount" ? (
                <CardHeader
                  avatar={
                    <Avatar
                      name={entry.personName}
                      size="35"
                      round={true}
                      maxInitials="1"
                    />
                  }
                  action={
                    <div  style={{display: "flex", alignItems: "center", gap: "5%", justifyContent: "center"}}>
                      <CurrencyRupeeIcon
                        sx={{
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      />
                      <span>{entry.amount}</span>
                    </div>
                  }
                  title={
                    <div
                      className="entry_head_name"
                      onClick={() => handleEditRow(entry.entryId)}
                    >
                      {entry.personName}
                    </div>
                  }
                  subheader={entry.city}
                />
              ) : (
                <CardHeader
                  avatar={
                    <Avatar
                      name={entry.personName}
                      size="35"
                      round={true}
                      maxInitials="1"
                    />
                  }
                  action={
                    <div style={{display: "flex", alignItems: "center", gap: "5%", justifyContent: "center"}}>
                      <CardGiftcardIcon  sx={{
                         fontSize: "14px",
                         color: "#fff",
                       }}
                     />
                      <span>{entry.gift}</span>
                    </div>
                     
                  }
                  title={
                    <div
                      className="entry_head_name"
                      onClick={() => handleEditRow(entry.entryId)}
                    >
                      {entry.personName}
                    </div>
                  }
                  subheader={entry.city}
                  // subheader={entry.gift}
                  // disableTypography={true}
                />
              )}

              {entry.entryId === selectedEntry && anchorEl ? (
                <Menu
                  className="entry_dropdown"
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => handleEditRow(entry.entryId)}>
                    Update
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteRow(entry.entryId)}>
                    Delete
                  </MenuItem>
                </Menu>
              ) : null}
            </Card>))}
            </>)}
            {editModalOpen ? (
            <EditEntry
              row={selectedRowId}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
          {deleteModalOpen ? (
            <DeleteEntry
              entryId={selectedRowId}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
            />
          ) : (
            <></>
          )}
                </Box>
        </Box>
        </RefreshContext.Provider>
    );
};

export default NewEntryList;
