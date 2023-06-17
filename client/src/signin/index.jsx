import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/Header';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SigninValidation from "./SigninValidation";
import { auth } from '../firebase';
import { useUserAuth } from '../auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Navbar from '../scenes/global/Navbar';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Footer from '../scenes/global/Footer';

const SignIn = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    // const {role, setRole, isLoggedIn, setIsLoggedIn, logout} = useAuthContext()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { googleSignIn, user } = useUserAuth();

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
 

  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  
  const handleChange = (event) => {
    setSigninData({
      ...signinData,
      [event.target.name]: event.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors(SigninValidation(signinData));
    setDataIsCorrect(true);
    setError("");

    signInWithEmailAndPassword(auth, signinData.email, signinData.password)
      .then(async (res) => {
        console.log(res);
    // navigate(`/dashboard?profile=${res.user.uid}`);
    
    navigate(`/newhome?profile=${res.user.uid}`);
      })
      .catch((err) => {
        setError(err.message);
      });
 
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      axios
          .post(`${process.env.REACT_APP_BASE_URL}/profile`, {
          profileId: user.uid,
          name: user.displayName,
          email: user.email,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.profileId);
          navigate(`/dashboard?profile=${user.uid}`);
        });
       
  
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div style={{width: "100vw", height: "100vh", overflow: "auto" , background: "linear-gradient(117.16deg,#cbedf9 26.56%,#a8dfff 83.56%)"}}>
    <Navbar/>
  
    < div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
    background: "#fff",  padding: "24px 20px", margin: "2% 25%", border: "1px solid #cad3dd", 
    borderRadius: "10px" }}>
      {/* {isLoggedIn === false ? ( */}
        {/* <Box backgroundColor="#F8E367" color="colors.grey[100]" display="flex" padding="2%" flexDirection="column" alignItems="center" justifyContent="center" borderRadius="10px"
        > */}
             
          {/* <Avatar sx={{ m: 1, backgroundColor: colors.blueAccent[700],}}>
            <LockOutlinedIcon />
          </Avatar>
          <br /> */}
        
            <Header title="Login To Moi-List" />
            <br />
            <Box display="flex" justifyContent="space-between" mt="20px" width="100%">
            <Button
            onClick={handleClick}
            type="submit"
          
            // variant="contained"
            sx={{
              background: "#fff",
    border: "1px solid #50bcd9",
    borderRadius: "4px",
    padding: "10px 17px",
    // margin: "0 4px",
    fontWeight: 500,
    fontSize: "14px",
    display: "flex",
width:"49%",
    alignItems: "center",
    color: "#292929"
          }}>
           <GoogleIcon /> Login with Google
          </Button>
          <Button
            onClick={handleClick}
            type="submit"
          
            // variant="contained"
            sx={{
              background: "#fff",
    border: "1px solid #50bcd9",
    borderRadius: "4px",
    padding: "10px 17px",
    // margin: "0 4px",
    width:"49%",
    fontWeight: 500,
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    color: "#292929"
          }}>
           <FacebookIcon />Login with Facebook
          </Button>
  {/* </Box> */}
  </Box>
  <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
    {/* <Box sx={{borderBottom: "1px solid black", width: "48%"}}/> */}
    <p style={{color: "black", textAlign: "bottom"}}>OR</p>
    {/* <Box sx={{borderBottom: "1px solid black", width: "48%"}}/> */}
  </Box>
  <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px"}}>
   
  <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <label for="email" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Email:</label>
  <input type="text" id="email" name="email"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}}  
    onChange={handleChange}
                  value={signinData.email} placeholder='Enter your email' />
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
     <label for="password" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Password:</label>
  <input type="password" id="password" name="password"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}} 
    onChange={handleChange}
    value={signinData.password} placeholder='Enter your Password'/>
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
  Sign In
</button>
</form>
            
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt="20px" width="100%">
      <Grid container>
              <Grid item xs>
                <Link href="#" sx={{color: "blue"}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" to="/signup" sx={{color: "black"}} >
                  Need to create an account? <span style={{color: "blue"}}>Sign Up</span>
                </Link>
      
              </Grid>
            </Grid>
            </Box>
      
   {/* ) : {logout}} */}

  </div>
  <Footer />
  </div>
)

}

export default SignIn;