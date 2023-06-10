import { Box, Button, MenuItem, useTheme, Typography, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState , useEffect} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DownloadEntries, { EntriesPdf } from "./DownloadEntries";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Download } from "@mui/icons-material";
import { DownloadsPdf } from "./DownloadReports";


const NewReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [date, setDate] = useState("")
    const [reportsArray, setReportsArray] = useState([])

    const [selectedEvent, setSelectedEvent] = useState({})
    const [selectedEntries, setSelectedEntries] = useState([])
    const [searchParam] = useSearchParams();
    const profileId = searchParam.get("profile");
    const [loading, setLoading] = useState(false);
   
    const getReports = (date) => {
      console.log("date :" + date)
      axios.get(`${process.env.REACT_APP_BASE_URL}/results`, { date:  date })
        .then((response) => {
          console.log("Reports : " + JSON.stringify(response.data))
          setReportsArray(response.data)
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
   
    return (
        <Box m="20px">
         
            <Box display="flex" flexDirection="column" gap="20vh" width="500px">
                <Header title="REPORTS"  />   
                <Box sx={{display:"flex", gap: "20px"}}>        
  <form style={{background: colors.blueAccent[2000], color: colors.primary[400], padding: 10, borderRadius: 10}}>
      
      <input type="date" placeholder="Date" name="date" value={date} onChange={(e)=>setDate(e.target.value)} />
    </form>
    <Button sx={{ width: "300px", backgroundColor:"rgb(25, 107, 167)" }} type="submit"  variant="contained" onClick={() => getReports(date)}
     
    >
      Download Report
    </Button>
    </Box>   
    </Box>
    {!loading ? null : (
    <>
      <p style={{ color: colors.greenAccent[500] }}>Ready to Download</p>
      <PDFDownloadLink
        document={<DownloadsPdf reportsArray={reportsArray} date={date}/>}
        fileName={`Reports - ${date}.pdf`}
      >
        <IconButton>
          <Download sx={{ color: "#fff", fontSize: 35 }} />
        </IconButton>
      </PDFDownloadLink>
    </>
  )}
            </Box>)}
            
export default NewReports;

