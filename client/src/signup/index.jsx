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

  const navigateToSignIn = () => {
    navigate("/signin");
  };
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
      fetch("http://localhost:1234/profile/add", {
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
    navigate(`/events?profile=${user.uid}`);
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
      .post("http://localhost:2010/profile", {
        profileId: user.uid,
        name: user.displayName,
        email: user.email,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.profileId);
      
      
      });
      navigate(`/events?profile=${user.uid}`);
   
  } catch (error) {
    console.log(error.message);
  }
};
  return (
    <>
     
        <Box display="flex" width="100%" height="100%" marginTop="5%" flexDirection="column" alignItems="center" justifyContent="center">
             
          <Avatar sx={{ m: 1, backgroundColor: "#2499ef" }}>
            <LockOutlinedIcon />
          </Avatar>
          <br />
        
            <Header title="SIGN UP" />
            <br />
            <form onSubmit={handleSubmitSignup}>
             
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
                  id="outlined-basic-name"
                  label="Name"
                  variant="outlined"
                  value={signupData.name}
                  onChange={updateHandleChange}
                  name="name"
                  sx={{ gridColumn: "span 10" }}
                  autoComplete="off"
                  color="secondary"
                  // required
                  type="text"
                />
                <TextField fullWidth
                 InputProps={{
                  style: { fontSize: "16px" },
                }}
                InputLabelProps={{ style: { fontSize: 18 } }}
                  id="outlined-basic-mobile"
                  label="Mobile Number"
                  variant="outlined"
                  value={signupData.mobile}
                  onChange={updateHandleChange}
                  name="mobile"
                  sx={{ gridColumn: "span 10" }}
                  autoComplete="off"
                  color="secondary"
                  // required
                  type="text"
                />
              <TextField fullWidth
                 InputProps={{
                  style: { fontSize: "16px" },
                }}
                InputLabelProps={{ style: { fontSize: 18 } }}
                  id="outlined-basic-email"
                  label="Email"
                  variant="outlined"
                  value={signupData.email}
                  onChange={updateHandleChange}
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
                  value={signupData.password}
                  onChange={updateHandleChange}
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
                  Sign Up
              </Button>
              {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
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
                <Link href="/" to="/" sx={{color: "white"}} >
                Already have an account? Sign in
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
            Sign Up with Google
          </Button>
  </Box>
  </Box>
  

  </>
)

}

export default SignUp;