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
import SigninValidation from "./SigninValidation";
import { auth } from '../firebase';
import { useUserAuth } from '../auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

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
    navigate(`/events?profile=${res.user.uid}`);
       
      })
      .catch((err) => {
        setError(err.message);
      });
 
  };
  
  const handleClick = async () => {
    try {
      await googleSignIn();
      axios
        .post("http://localhost:2010/profile", {
          profileId: user.uid,
          name: user.displayName,
          email: user.email,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.profileId);
          // navigate(`/eventslist?profile=${response.user.uid}`);
          navigate(`/events?profile={response.user.uid}`)
        });

      // signInWithPopup(auth, provider).then((data) => {
      //   setValue(data.user.email);
      // localStorage.setItem("email", data.user.email);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {/* {isLoggedIn === false ? ( */}
        <Box display="flex" width="100%" height="100%" marginTop="-5%" flexDirection="column" alignItems="center" justifyContent="center">
             
          <Avatar sx={{ m: 1, backgroundColor: "#2499ef" }}>
            <LockOutlinedIcon />
          </Avatar>
          <br />
        
            <Header title="SIGN IN" />
            <br />
            <form onSubmit={handleLogin}>
             
              <Box
                display="grid"
                alignItems="center"                
                gap="30px"
                gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 10" },
                }}
              >
              <TextField fullWidth
                 InputProps={{
                  style: { fontSize: "16px" },
                }}
                InputLabelProps={{ style: { fontSize: 18 } }}
                  id="outlined-basic-email"
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  value={signinData.email}
                  name="email"
                  sx={{ gridColumn: "span 10" }}
                  autoComplete="off"
                  color="secondary"
                  // required
                  type="email"
                />

                {/* <br /> */}
                <TextField fullWidth
                 InputProps={{
                  style: { fontSize: "16px" },
                }}
                InputLabelProps={{ style: { fontSize: 18 } }}
                  id="outlined-basic-password"
                  label="Password"
                  variant="outlined"
                  onChange={handleChange}
                  value={signinData.password}
                  name="password"
                  sx={{ gridColumn: "span 10" }}
                  color="secondary"
                  // required
                  type="password"
                />
              </Box>
         
                 <br />
                 {error && (
                <Typography sx={{color: "red", paddingBottom: 2}}>
                  {error}
                </Typography>
              )}
              <br />

          <Box display="flex" justifyContent="center" mt="20px" sx={{ gridColumn: "span 10" }}>
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
                  Login
              </Button>
              
          </Box>
          
      </form>
      <Box display="flex" justifyContent="center" mt="20px" sx={{ gridColumn: "span 10" }}>
      <Grid container>
              {/* <Grid item xs>
                <Link href="#" sx={{color: "white"}}>
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="signup" to="/signup" sx={{color: "white"}} >
                  Don't have an account? Sign Up
                </Link>
      
              </Grid>
            </Grid>
            </Box>
            <Box display="flex" justifyContent="center" mt="20px" sx={{ gridColumn: "span 10" }}>
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
            Sign In with Google
          </Button>
  </Box>
  </Box>
   {/* ) : {logout}} */}

  </>
)

}

export default SignIn;