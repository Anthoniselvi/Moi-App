import { Box, Input, Typography } from '@mui/material'
import React, {useState} from 'react'
import SidebarDrawer from '../home/SidebarDrawer'
import CssBaseline from '@mui/material/CssBaseline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./styles.css";
import { useNavigate , useSearchParams} from 'react-router-dom';
import axios from 'axios';

export default function NewCreateEvent() {
  const navigate = useNavigate()
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  // const { updateRefreshCount } = useContext(RefreshContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/events/add`, {
        // eventId: eventId,
        eventType: eventType,
        name: name,
        place: place,
        date: date,
        profileId: profileId,
      })
      .then((response) => {
        console.log(response);
        // navigate(`/newhome?profile=${profileId}`);
      });
    setEventType("");
    setName("");
    setPlace("");
    setDate("");  
    navigate(`/newhome?profile=${profileId}`);
    // refreshPage();
  };
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa" }}>
    {/* <CssBaseline /> */}
    <SidebarDrawer />
   <Box 
   sx={{minHeight: "80vh", width: "80%", padding:" 2% 20%",     
   backgroundColor: "#fff",
    border: "1px solid #e8ecf1", borderRadius: "10px", 
    display: "flex", flexDirection: "column", alignItems: "center"}}>
        
        <Box 
        sx={{ borderBottom:"1px solid #e8ecf1", 
        height: "20%", width: "100%", display: "flex", 
        flexDirection: "column", alignItems: "center", 
        justifyContent: "center", paddingBottom: "40px"}}>
        <CardGiftcardIcon sx={{fontSize: "60px", color: "#FE956F"}}  />
      <Typography sx={{color: "#101a34", textAlign: "center", 
      fontFamily: "Poppins", fontSize: "30px", fontWeight: 600}}>
        Let's create your Event!</Typography> 
   </Box>

   <form onSubmit={handleSubmit} style={{margin: "5% 0%", width: "100%", display: "flex", flexDirection: "column", gap: "20px"}}>
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <label for="eventType" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Event Type:</label>
 <select style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} 
    value={eventType}
    onChange={(e) => setEventType(e.target.value)}>
  <option value="wedding">Wedding</option>
  <option value="birthday">Birthday</option>
  <option value="baby">Baby Shower</option>
  <option value="house">House Warming</option>
  <option value="others">Others</option>
  </select>
  </div>
  <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <label for="name" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Event Name:</label>
  <input type="text" id="name" name="name"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}}  
    value={name}
    onChange={(e) => setName(e.target.value)} />
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
     <label for="place" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Place:</label>
  <input type="text" id="place" name="place"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} 
    value={place}
    onChange={(e) => setPlace(e.target.value)}/>
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
     <label for="lname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Event Name:</label>
  <input type="date" id="lname" name="lname"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34", 
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}}
    value={date}
            onChange={(e) => setDate(e.target.value)} />
    </div>
    <button type='submit'
    style={{
  marginTop: "10px",
  backgroundColor: "#50bcd9",
  color: "#ffffff",
  width: "100%",
  height: "44px",
  padding: "8px 15px",
  fontWeight: 400,
  borderRadius: "7px",
  fontSize: "16px",
  lineHeight: "20px",
  fontFamily: "Poppins",
  border: "none",
  cursor: "pointer"
}}
  onMouseEnter={(e) => {
    e.target.style.border = "1px solid #50bcd9";
    e.target.style.backgroundColor = "#ffffff";
    e.target.style.color = "#50bcd9";
  }}
  onMouseLeave={(e) => {
    e.target.style.border = "none";
    e.target.style.color = "#ffffff";
    e.target.style.backgroundColor = "#50bcd9";
  }}
>
  Continue
</button>
</form>

</Box>
   </Box>

  )
}
