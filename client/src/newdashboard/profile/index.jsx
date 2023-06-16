import { Box, Input, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import SidebarDrawer from '../home/SidebarDrawer'
import CssBaseline from '@mui/material/CssBaseline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./styles.css";
import axios from 'axios';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate, useSearchParams } from 'react-router-dom';
const drawerWidth = 240;
export default function NewProfile() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");

  const navigateToNewEventPage = () => {
    navigate("/eventpage")
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/profile/${profileId}`, {
      
        name: name,
        age: age,
        gender: gender,
        address: address,
        city: city,
        mobile: mobile,
        email: email,
      })
      .then((response) => {
        console.log("updated profile: " + JSON.stringify(response));
        alert("Profile updated successfully")
        // navigate(`/events?profile=${profileId}`);
      });
  };
  const getProfile = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/profile/${profileId}`).then((response) => {
      // console.log(response);
      console.log("get selected Profile : " + JSON.stringify(response.data));
      // setProfiles(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setMobile(response.data.mobile)
      setAge(response.data.age)
      setAddress(response.data.address)
      setCity(response.data.city)
      setGender(response.data.gender)
    });
  };

  useEffect(() => {
    
    getProfile();
  }, []);
  return (
    <Box sx={{ display: 'flex', backgroundColor: "#f5f7fa" }}>
    <CssBaseline />
    <SidebarDrawer />
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: '#f5f7fa', p: 3, width: `calc(100% - ${drawerWidth}px)`, }}
    >
      {/* <Toolbar /> */}
      <Typography sx={{color: "#101a34",  
  fontFamily: 'Poppins',   fontWeight: 600,
  fontSize: "32px", lineHeight: "34px", marginTop: "-50px"}}>
        Profile
      </Typography>
   <Box display="flex" gap="50px" padding="2% 0%" borderBottom="1px solid #cad3dd">
   <Box display="flex" alignItems="center" justifyContent="center" height="90px" width="90px" borderRadius="50%"  backgroundColor= "#50bcd9" color="#fff" fontFamily="Poppins" fontSize="35px">A</Box>
  <Box display="flex" flexDirection="column" gap="10px" alignItems="left" justifyContent="center">
    <Typography sx={{fontFamily: "Poppins", fontSize: "17px", lineHeight: "22px", color: "#101a34", fontWeight: 600}}>Anthoni Selvi</Typography> 
    <Typography sx={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "16px", color: "#5e6577"}}>anthoniselvi33@gmail.com</Typography>
  </Box>
   </Box>
   
   <form onSubmit={handleSubmit} style={{margin: "2% 0%", width: "100%", display: "flex", flexDirection: "column", gap: "20px"}}>
   <Box display="flex" alignItems="center" justifyContent="space-between">
   <Typography sx={{fontFamily: "Poppins", fontSize: "20px", lineHeight: "25px", color: "#101a34", fontWeight: 600}}>Personal Info</Typography> 
   <button type='submit'
    style={{
//   marginTop: "10px",
  backgroundColor: "#50bcd9",
  color: "#ffffff",
  width: "200px",
  height: "44px",
  padding: "8px 15px",
  fontWeight: 400,
  borderRadius: "7px",
  fontSize: "16px",
  lineHeight: "20px",
  fontFamily: "Poppins",
  border: "none",
  cursor: "pointer",
  display: "flex", gap:"10px",
  alignItems: "center",
  justifyContent: "center"
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
 <TaskAltIcon /> Save Changes
</button>

   </Box>
   <Box display="flex" flexWrap="wrap" gap="5%">
   <div style={{display: "flex", flexDirection: "column", gap: "10px", width: "30%", marginBottom: "20px"}}>
  <label for="lname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Name:</label>
  <input type="text" id="lname" name="lname" value={name} onChange={(e) => setName(e.target.value)}  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} />
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: "10px", width: "30%",marginBottom: "20px"}}>
  <label for="fname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Gender:</label>
 <select value={gender} onChange={(e) => setGender(e.target.value)} style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} >
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="others">Others</option>
  </select>
  </div>
  <div style={{display: "flex", flexDirection: "column", gap: "10px", width: "30%",marginBottom: "20px"}}>
  <label for="lname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>City:</label>
  <input type="text" id="lname" name="lname"    value={city} onChange={(e) => setCity(e.target.value)}  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} />
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: "10px", width: "30%",marginBottom: "20px"}}>
     <label for="lname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Mobile:</label>
  <input type="text" id="lname" name="lname"    value={mobile} onChange={(e) => setMobile(e.target.value)}  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} />
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: "10px", width: "30%",marginBottom: "20px"}}>
     <label for="lname" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Email:</label>
  <input type="text" id="lname" name="lname" value={email}    onChange={(e) => setEmail(e.target.value)} style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34", 
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} />
    </div>
    </Box>


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
