import { Box, Input, Typography } from '@mui/material'
import React from 'react'
import SidebarDrawer from '../home/SidebarDrawer'
import CssBaseline from '@mui/material/CssBaseline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

export default function NewEvents() {
  const navigate = useNavigate()

  const navigateToNewEventPage = () => {
    navigate("/eventpage")
  }
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa" }}>
    {/* <CssBaseline /> */}
    <SidebarDrawer />
   <Box 
   sx={{minHeight: "80vh", width: "80%", padding:" 5% 20%",     
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

   <form style={{margin: "5% 0%", width: "100%", display: "flex", flexDirection: "column", gap: "20px"}}>
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <label for="fname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Event Type:</label>
 <select style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} >
  <option>Wedding</option>
  <option>Birthday</option>
  <option>Baby Shower</option>
  <option>House Warming</option>
  <option>Others</option>
  </select>
  </div>
  <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <label for="lname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Event Name:</label>
  <input type="text" id="lname" name="lname"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} />
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
     <label for="lname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Place:</label>
  <input type="text" id="lname" name="lname"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} />
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
     <label for="lname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Event Name:</label>
  <input type="date" id="lname" name="lname"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34", 
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} />
    </div>
    <button onSubmit={navigateToNewEventPage}
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
{/* <form>      
      <br />
       <FormControl sx={{ width: "100%" , background: "#fff", borderRadius: "7px",
    // width: "100%",       height:"44px", padding: "8px 15px", 
    fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins" 
//  "& > div": { width: isNonMobile ? undefined : "250px"} 
}}>
      <InputLabel color="secondary" id="demo-simple-select-label">Event Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        required
        // value={eventType}
        label="Event Type"
        color="secondary"
        // onChange={
        //   (e) => setEventType(e.target.value)
        // }
      >
        <MenuItem value="wedding">Wedding</MenuItem>
        <MenuItem value="birthday">Birthday</MenuItem>
        <MenuItem value="baby">Baby Shower</MenuItem>
        <MenuItem value="house">House Warming</MenuItem>
        <MenuItem value="others">Others</MenuItem>
      </Select>
    </FormControl>
      <br />
      <br />
      <TextField
        sx={{ width: "100%" , background: "#fff", borderRadius: "7px",
        // width: "100%",       height:"44px", padding: "8px 15px", 
        fontWeight: 400,
        fontSize: "16px", lineHeight: "20px",
         color: "#101a34",
        border: "1px solid #cad3dd",
        fontFamily: "Poppins" 
        // "& > div": { width: isNonMobile ? undefined : "250px"} 
       }}
        type="text"
        color="secondary"
        label="Event Name"
        variant="outlined"
        // value={name}
        // onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <TextField
        sx={{ width: "100%" , background: "#fff", borderRadius: "7px",
        // width: "100%",       height:"44px", padding: "8px 15px", 
        fontWeight: 400,
        fontSize: "16px", lineHeight: "20px",
         color: "#101a34",
        border: "1px solid #cad3dd",
        fontFamily: "Poppins" 
        // "& > div": { width: isNonMobile ? undefined : "250px"} 
       }}
        type="text"
        label="Place"
        variant="outlined"
        color="secondary"
        // value={place}
        // onChange={(e) => setPlace(e.target.value)}
      />
      <br />
      <br />
      <TextField
        sx={{ width: "100%" , background: "#fff", borderRadius: "7px",
        // width: "100%",       height:"44px", padding: "8px 15px", 
        fontWeight: 400,
        fontSize: "16px", lineHeight: "20px",
         color: "#101a34",
        border: "1px solid #cad3dd",
        fontFamily: "Poppins" 
        // "& > div": { width: isNonMobile ? undefined : "250px"} 
       }}
        type="date"
        label="Date"
        variant="outlined"
        color="secondary"
        // value={date}
        // onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <br />
    </form> */}
</Box>
   </Box>

  )
}
