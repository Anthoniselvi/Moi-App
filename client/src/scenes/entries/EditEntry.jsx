import * as React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { RefreshContext } from "./Entries";

export default function EditEntry({ open,  onClose,  entryId }) {
  
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [personName, setPersonName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [gift, setGift] = useState("");
  const [presentType, setPresentType] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const { updateRefreshCount } = useContext(RefreshContext);

  function refreshPage() {
    updateRefreshCount();
  }

  const handleEditSave = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/entries/edit/${entryId}`, {
        personName: personName,
        city: city,
        presentType: presentType,
        amount: amount,
        gift: gift,
       
      })
      .then((response) => {
        console.log("Updated Entry : " + JSON.stringify(response));
      });
    onClose();

    refreshPage();
  };

  const getSelectedEntry = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/entries/single/${entryId}`).then((response) => {
      // console.log(response);
     
      console.log("Totals : " + JSON.stringify(response.data));
      setPersonName(response.data.personName);
      setCity(response.data.city);
      setPresentType(response.data.presentType);
      setAmount(response.data.amount);
      setGift(response.data.gift);
    });
  };
  useEffect(() => {
   
    getSelectedEntry()
  }, [refreshCount]);

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle textAlign="center" variant="h4">Edit </DialogTitle>
        <DialogContent>
        <form>
          <TextField
            sx={{ width: "300px", margin: "5px" , "& > div": { width: isNonMobile ? undefined : "250px"} }}
            type="text"
            label="Person Name"
            variant="outlined"
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
                  sx={{ width: "300px", margin: "5px" , "& > div": { width: isNonMobile ? undefined : "250px"} }}
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
        <DialogActions>
          <Button type="submit" color="secondary" variant="contained" onClick={onClose}>CANCEL</Button>
          <Button type="submit" color="secondary" variant="contained" onClick={handleEditSave}>EDIT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
