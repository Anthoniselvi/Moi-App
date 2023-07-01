import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box , Typography, Button} from '@mui/material'
import SidebarDrawer from '../home/SidebarDrawer'
import NewEntiesList from '../entries'
import axios from 'axios'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewCreateEntry from '../entries/NewCreateEntry'
import NewEditEvent from './NewEditEvent'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
const drawerWidth = 240;
export default function NewEventPage() {
  const [entries, setEntries] = useState([]);
  const [eventsList, setEventsList] = useState({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalGift, setTotalGift] = useState(0)
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [selectedRow, setSelectedRow] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
 
  const [selectedRowId, setSelectedRowId] = useState();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const getSelectedEvent = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setEventsList(response.data);
      });
  };

  const handleEditEvent = (eventId) => {
    setAnchorEl(null)
      setEditModalOpen(true);
      setSelectedRowId(eventId);
    };
  const fetchAllEntries = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/entries/all/${eventId}`).then((response) => {
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
  }, []);
  return (

    <Box m="20px" >
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "10%", width: "100%", paddingTop: "5%"}}>
        
        <Typography sx={{color: "#101a34",  
    fontFamily: 'Poppins',   fontWeight: 600,
    fontSize: "25px", lineHeight: "34px", }}>
          {eventsList.name}
        </Typography>
        <div style={{    color: "#101a34", background: "#fafbfd", border: "1px solid #cad3dd", display: "flex", alignItems: "center", gap: "5px", padding: "8px 15px",
    fontWeight: 600, fontSize: "13px", lineHeight: "18px", borderRadius: "5px", fontFamily: "Poppins", cursor: "pointer"}} onClick={() => handleEditEvent(eventId)}><BorderColorOutlinedIcon />Edit </div>
      
</Box>
      <Box sx={{width: "100%", height:  "80vh", borderRadius: "10px", border: "1px solid #cad3dd", marginTop: "4%"}}>

 
     <Box sx={{height: "10%", width: "100%", borderBottom: "1px solid #cad3dd", display: "flex", alignItems: "center" , justifyContent: "space-between", paddingLeft: "2%", paddingRight: "2%"}}>
      <Typography sx={{ color: '#101a34',
      borderBottom: '2px solid #FE956F',
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '17px',}}>Entries ({entries.length})</Typography>
      <Button onClick={() => setCreateModalOpen(true)} sx={{display: "flex", alignItems: "center", justifyContent: "center" , gap: "5px", outline: "none",border: "none", color: "#50bcd9", background: "none"}}><AddCircleOutlineIcon />Add</Button>
      </Box>
     
     <Box sx={{padding: 0,height: "100%", width:"100%", display: "flex", flexWrap: "wrap", gap: "20px", backgroundColor: "#ffffff"}}>
   <NewEntiesList entries={entries} eventsList={eventsList} totalAmount={totalAmount} totalGift={totalGift}/>
        </Box>
        </Box>
        {createModalOpen ? (
      <NewCreateEntry
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            eventId={eventId}
          />) : <></>}
          {editModalOpen ? (
            <NewEditEvent
              eventId={eventId}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
        </Box>
  )
}
