import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Profile(props) {
  const navigate = useNavigate();
    const [name, setName] = useState("");

  const [email, setEmail] = useState("");


  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:1234/profile/${profileId}`, {
      
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

  const navigateToEventsList = () => {
    navigate(`/events?profile=${profileId}`);
  };

 
  const getProfile = () => {
    axios.get(`http://localhost:1234/profile/${profileId}`).then((response) => {
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
    <div style={{margin: 20}}>
      <div style={{display: "flex", alignItems: "center", gap: "3%"}}>
     
        <ArrowBackIcon onClick={navigateToEventsList} style={{cursor: "pointer"}} />

      <div className="editprofile-image">
        <FaUserAlt className="profile-icon" style={{fontSize: 22}} />
      </div>
      <h1>Profile</h1>
      </div>
    
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 ,  width: "500px"}}
        className="profile-form"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          readOnly
                   sx={{
            '& label': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-root': {
              borderColor: '#fff',
            },}}
          onChange={(e) => setName(e.target.value)}
          // error={errors.email}
        />
        {/* {errors.email && <p className="error">{errors.email}</p>} */}
        {/* /> */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="age"
          label="Age"
          type="age"
          id="age"
          autoComplete="age"
          InputLabelProps={{
            style: { color: "#fff" }
          }}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          // error={errors.password}
        />
        {/* {errors.password && <p className="error">{errors.password}</p>} */}
        {/* /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          InputLabelProps={{
            style: { color: "#fff" }
          }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          // error={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          autoComplete="city"
          autoFocus
          InputLabelProps={{
            style: { color: "#fff" }
          }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          // error={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="mobile"
          label="Mobile Number"
          name="mobile"
          autoComplete="mobile"
          autoFocus
          InputLabelProps={{
            style: { color: "#fff" }
          }}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          // error={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          readOnly
          InputLabelProps={{
            style: { color: "#fff" }
          }}
          onChange={(e) => setEmail(e.target.value)}
          // error={errors.email}
        />
        <Button
          // onClick={navigateToEventList}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </div>
  );
}

export default Profile;
