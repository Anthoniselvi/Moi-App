import { Box, Button, TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/Header';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Validation from './Validation';
import { auth , db} from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useUserAuth } from '../auth';
import Navbar from '../scenes/global/Navbar';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Footer from '../scenes/global/Footer';
const SignUp = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    // const {role, setRole, isLoggedIn, setIsLoggedIn, logout} = useAuthContext()
    const { googleSignIn, user } = useUserAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [signupData, setSignupData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const navigateToSignIn = () => {
  //   navigate("/signin");
  // };
  const updateHandleChange = (event) => {
    // setErrors(Validation(signupData));

    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

const handleSubmitSignup = async (e) => {
  setLoading(true);
  e.preventDefault();
  setErrors(Validation(signupData));
  setDataIsCorrect(true);
  setError("");

  createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
    .then(async (res) => {
      const user = res.user;
      await updateProfile(user, {
        displayName: signupData.name,
      });
      // create Profile here
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: signupData.name,
        mobile: signupData.mobile,
        email: signupData.email,
        password: signupData.password,
      });
      console.log("firebase signup created");

      // Make the POST request to your API endpoint
      fetch(`${process.env.REACT_APP_BASE_URL}/profile/add`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    profileId: user.uid,
    name: signupData.name,
    email: signupData.email,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log("fetch id:" + data.profileId);
    navigate(`/dashboard?profile=${user.uid}`);
  })
  .catch((error) => {
    console.log(error);
    setError(error.message);
  });

})
}

const handleClick = async () => {
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
      
      
      });
      navigate(`/dashboard?profile=${user.uid}`);
   
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
        
            <Header title="Sign up for Moi-List" />
            <Typography sx={{color: "black"}}>It’s quick and easy.</Typography>
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
  <form onSubmit={handleSubmitSignup} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px"}}>
   
  <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <label for="name" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Name:</label>
  <input type="text" id="name" name="name"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}}  
    value={signupData.name}
                  onChange={updateHandleChange}
                  placeholder='Enter your Name' />
    </div>     
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <label for="mobile" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Mobile Number:</label>
  <input type="text" id="mobile" name="mobile"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}}  
    value={signupData.mobile}
    onChange={updateHandleChange}
                  placeholder='Enter your Mobile Number' />
    </div>  
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <label for="email" style={{fontFamily: "Poppins", fontSize: "13px", lineHeight: "18px", color: "#101a34", fontWeight: 600}}>Email:</label>
  <input type="text" id="email" name="email"  style={{background: "#fff", borderRadius: "7px",
    width: "100%",       height:"44px",
    padding: "8px 15px", fontWeight: 400,
    fontSize: "16px", lineHeight: "20px",
     color: "#101a34",
    border: "1px solid #cad3dd",
    fontFamily: "Poppins"}}  
    value={signupData.email}
                  onChange={updateHandleChange}
                  placeholder='Enter your Email' />
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
    value={signupData.password}
                  onChange={updateHandleChange}
                  placeholder='Enter your Password' />
    </div>  
           

          {/* <Box display="flex" justifyContent="center" mt="10px" sx={{ gridColumn: "span 10" }}> */}
          <Button type="submit" 
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            // padding: "10px 20px",
                            width: '100%', 
                            '&:hover ': {
                              backgroundColor: colors.grey[100],
                              color: colors.blueAccent[700]
                            },
                        }}>
                  Sign Up
              </Button>
              {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          {/* </Box> */}
          
      </form>
      <Box display="flex" justifyContent="center" mt="20px" sx={{ gridColumn: "span 10" }}>
      <Grid container>
              {/* <Grid item xs>
                <Link href="#" sx={{color: "white"}}>
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/login" to="/login" sx={{color: "black"}} >
                Already have an account? Login
                </Link>
      
              </Grid>
            </Grid>
            </Box>
            {/* <Box display="flex" justifyContent="center" mt="20px" sx={{ gridColumn: "span 10" }}>
            <Button
            onClick={handleClick}
            type="submit"
          
            // variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 50px",
              width: '100%', 
              '&:hover ': {
                backgroundColor: colors.grey[100],
                color: colors.blueAccent[700]
              },
          }}>
            Sign Up with Google
          </Button>
  </Box> */}
  </div>
  <Footer />
  </div>
)

}

export default SignUp;