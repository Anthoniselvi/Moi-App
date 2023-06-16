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
    < div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "5% auto"}}>
      {/* {isLoggedIn === false ? ( */}
        <Box backgroundColor="#F8E367" color="colors.grey[100]" display="flex" padding="2%" flexDirection="column" alignItems="center" justifyContent="center" borderRadius="10px"
        >
             
          <Avatar sx={{ m: 1, backgroundColor: colors.blueAccent[700],}}>
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
                  style: { fontSize: "15px", color: "#180a91" },
                }}
                InputLabelProps={{ style: { fontSize: 16, color: "#180a91" } }}
                  id="outlined-basic-email"
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  value={signinData.email}
                  name="email"
                  sx={{ gridColumn: "span 10" , color: "#180a91", borderColor: "#180a91"}}
                  autoComplete="off"
                  color="secondary"
                  // required
                  type="email"
                />

                {/* <br /> */}
                <TextField fullWidth
                 InputProps={{
                  style: { fontSize: "16px", color: "#180a91", borderColor: "#180a91" },
                }}
                InputLabelProps={{ style: { fontSize: 18 , color: "#180a91", borderColor: "#180a91"} }}
                  id="outlined-basic-password"
                  label="Password"
                  variant="outlined"
                  onChange={handleChange}
                  value={signinData.password}
                  name="password"
                  sx={{ gridColumn: "span 10", borderColor: "#180a91" }}
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
                <Link href="signup" to="/signup" sx={{color: "colors.blueAccent[700]"}} >
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

  </div>
)

}

export default SignIn;