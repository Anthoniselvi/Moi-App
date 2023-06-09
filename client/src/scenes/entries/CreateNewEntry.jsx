import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, useMediaQuery
} from "@mui/material";
import "date-fns";
import { useNavigate,useSearchParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { RefreshContext } from "./Entries";
// import { RefreshContext } from "./index";

export default function CreateNewEntry({ open, onClose, eventId }) {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const [personName, setPersonName] = useState();
    const [city, setCity] = useState();
    const [amount, setAmount] = useState(0);
    const [gift, setGift] = useState("");
    const [presentType, setPresentType] = useState("amount");
   const { updateRefreshCount } = useContext(RefreshContext);

  function refreshPage() {
    updateRefreshCount();
  }

  const handleClose = () => {
    onClose();
    setPersonName("");
    setCity("");
    setPresentType("");
    setAmount("");
    setGift("");
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/entries/add`, {
        
        personName: personName,
        city: city,
        presentType: presentType,
        amount: amount,
        gift: gift,
        eventId: eventId
      })
      .then((response) => {
        console.log(response);
        console.log("Created New Entry: " + response.data)
      })
      onClose();
      setPersonName("");
      setCity("");
      setPresentType("");
      setAmount("");
      setGift("");
      refreshPage();
     
  };
 
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center" variant="h4">Create</DialogTitle>
      <DialogContent>
        <form style={{paddingTop: 2}}>
          <TextField
            sx={{ width: "300px", margin: "5px" , "& > div": { width: isNonMobile ? undefined : "250px"} }}
            type="text"
            label="Person Name"
            variant="outlined"
            InputLabelProps={{
              style: { color: "#fff" }
            }}
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            sx={{ width: "300px", margin: "5px", "& > div": { width: isNonMobile ? undefined : "250px"}  }}
            type="text"
            label="City"
            variant="outlined"
            InputLabelProps={{
              style: { color: "#fff" }
            }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <br />
          <FormControl sx={{ width: "300px", margin: "5px", "& > div": { width: isNonMobile ? undefined : "250px"}   }}>
            <FormLabel id="demo-controlled-radio-buttons-group"  style={{ width: "300px", margin: "5px", color: "#fff" }}>
              Type of Presentation :
            </FormLabel><br />
            <RadioGroup
              value={presentType}
              onChange={(e) => setPresentType(e.target.value)}
            >
              {/* <div className="radio-button"> */}
                <FormControlLabel
                  control={<Radio />}
                  label="Amount"
                  value="amount"
                  
                  // defaultChecked={selected === "amount"}
                  // onChange={(e) => setSelected(e.target.value)}
                />
                <FormControlLabel
                
                  control={<Radio />}
                  label="Gift"
                  value="gift"
                  
                  // defaultChecked={selected === 0}
                  // onChange={(e) => setSelected(e.target.value)}
                />
                <br />
               
              {/* </div> */}
              {presentType === "amount" ? (
                // <div>
                  <TextField
                  sx={{ width: "300px", margin: "5px", "& > div": { width: isNonMobile ? undefined : "250px"}  }}
                    id="outlined-amount"
                    label="Rs."
                    InputLabelProps={{
                      style: { color: "#fff" }
                    }}
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    // sx={{ width: "300px", marginBottom: "5%" }}
                  />
                // </div>
              ) : (
                // <div className="gift-box">
                  <TextField
                  sx={{ width: "300px", margin: "5px", "& > div": { width: isNonMobile ? undefined : "250px"}  }}
                    id="outlined-multiline-static"
                    label="about gift"
                    InputLabelProps={{
                      style: { color: "#fff" }
                    }}
                    multiline
                    // rows={4}
                    // sx={{ width: "300px", marginBottom: "5%" }}
                    onChange={(e) => setGift(e.target.value)}
                    value={gift}
                  />
                // </div>
              )}
             
            </RadioGroup>
          </FormControl>
        
          <br />
          <br />
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button type="submit" color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
        <Button type="submit" color="secondary" variant="contained" onClick={(e)=>handleSubmit(e,eventId)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
