import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect, createContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Avatar from "react-avatar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CreateNewEntry from "./CreateNewEntry";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOrDelete from "./EditOrDeleteEntry";

// export const RefreshContext = createContext();
export const RefreshContext = createContext({
    updateRefreshCount: () => {}
  });
const Entries = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const [entries, setEntries] = useState([]);
 const [eventsList, setEventsList] = useState({})
    const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(); 
  const [selectedRowId, setSelectedRowId] = useState();
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalGift, setTotalGift] = useState(0)

  const [refreshCount, setRefreshCount] = useState(0);

 
  
    const updateRefreshCount = () => {
      setRefreshCount(refreshCount + 1);
    };
  
    function refreshPage() {
      updateRefreshCount();
    }
  const createEntry = () => {
   setCreateModalOpen(true)
  }
    const handleDeleteRow = (row) => {
      setDeleteModalOpen(true);
      setSelectedRowId(row.entryId);
    };
  
    const handleEditRow = (row) => {
      console.log("Row inside edit button click:" + JSON.stringify(row));
      setEditModalOpen(true);
      setSelectedRow(row);
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
        <Box  m="20px">
            <Header title={eventsList.name} />
        
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap="20px" >
  {entries.length > 0 && (
    <>
      {entries.map((entry, index) => (
        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" gap="20px" padding="2% 4%" borderRadius="10px" sx={{ backgroundColor: colors.primary[400] }}  >
         <Box display="flex" gap="20%">
         <Avatar
                      name={entry.personName}
                      size="40"
                      round={true}
                      maxInitials="1"
                    />
         
          <Box display="flex" flexDirection="column" gap="5%"  alignItems="flex-start">
            <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100] }}>
              {entry.personName}
            </Typography>
            <Typography variant="h6" sx={{ color: colors.grey[100] }}>
              {entry.city}
            </Typography>
          </Box>
          </Box>
         
          <Box display="flex" flexDirection="column" alignItems="flex-end">
          {entry.presentType === "amount" ? (
            <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
              {entry.amount}
            </Typography>) : (
            <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
              {entry.gift}
            </Typography>)}
          </Box>
          <Box>
          <EditOrDelete entryId={entry.entryId} />
          </Box>
        </Box>
      ))}
    </>
  )}
</Box>
<Box display="flex" marginLeft="70vw" marginTop="55vh" >
<Fab color="secondary" aria-label="add" >
        <AddIcon onClick={() => setCreateModalOpen(true)} />
      </Fab>
      </Box>
      {createModalOpen ? (
      <CreateNewEntry
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            eventId={eventId}
          />) : <></>}
             {editModalOpen ? (
            <EditEntry
              row={selectedRow}
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

           
     
        </RefreshContext.Provider>
    );
};

export default Entries;