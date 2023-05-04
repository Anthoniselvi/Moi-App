import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme} from "@mui/material";
import { Box, Button, IconButton } from "@mui/material";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import { useSearchParams, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import CreateNewEvent from "./CreateNewEvent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Typography from "@mui/material/Typography";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

import EditOrDelete from "./EditOrDelete";

export const RefreshContext = createContext();

const EventsList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [searchParam] = useSearchParams();
      const profileId = searchParam.get("profile");
      const [eventslist, setEventsList] = useState([])

      const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedRowId, setSelectedRowId] = useState();

      const navigate = useNavigate()

  const [refreshCount, setRefreshCount] = useState(0);
 
    const updateRefreshCount = () => {
      setRefreshCount(refreshCount + 1);
    };
  
    // function refreshPage() {
    //   updateRefreshCount();
    // }
  
  
    //   const navigateToCreate = () => {
    //     navigate(`/events/new?profile=${profileId}`);
    //   }
const navigateToEntryList = (eventId) => {
  // navigate(`/entries?event=${eventId}`)
  navigate(`/entriesList?event=${eventId}`)
}

      const fetchTotals = () => {
        axios.get(`http://localhost:1234/entries/total/${profileId}`).then((response) => {
          // console.log(response);
         
          console.log("Totals : " + JSON.stringify(response.data));
         setEventsList(response.data)

        });
      };
      useEffect(() => {

        fetchTotals()
      }, [refreshCount]);

    
    return (
        
        <RefreshContext.Provider value={{ updateRefreshCount }}>
        <Box display="flex" alignContent="center" justifyContent="space-between" margin= "2%" marginBottom= "0%">
                <Header title="EVENTS"   />
                {/* <Typography sx={{fontSize: "18px"}}>{eventsList.name}</Typography> */}
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => setCreateModalOpen(true)}
           
                    >
                        <AddIcon sx={{ mr: "10px" }} />
                        New
                    </Button>
                </Box>
            </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="2%" rowGap="8%" padding="2%" background= "colors.primary[400]">
        {eventslist.length > 0 && (
          <>
            {eventslist.map((singleEvent, eventId) => (
            
                <Card sx={{ backgroundColor: colors.primary[400]  }}> 
                 
                  <CardActionArea>
                  <Box sx={{ position: "relative" }}>
  <CardMedia
    component="img" 
    src={singleEvent.eventImage}
    sx={{ height: 150, backgroundSize: "contain" }}
    className="card-image-birthday"
    onClick={(e) => {
      e.stopPropagation();
      navigateToEntryList(singleEvent.eventId);
    }}
  />
  <Typography variant="subtitle1" sx={{ position: "absolute", top: 0, left: 0, p: 0.5, color: colors.blueAccent[800], fontWeight: "bold", fontSize: 20 }}>
    {singleEvent.eventName}
  </Typography>
 
  <IconButton
    aria-label="more"
    sx={{ position: "absolute", top: 0, right: 0, color: colors.blueAccent[800], p: 1 }}
    onClick={(e) => {
      e.stopPropagation();
      // handle more button click
    }}
  >
     <EditOrDelete eventId={singleEvent.eventId} />
  </IconButton>
</Box>
                  {/* <CardMedia
  component="img"
  src={singleEvent.eventImage}
  sx={{ height: 150, backgroundSize: "contain" }}
  className="card-image-birthday"
  onClick={(e) => {
    e.stopPropagation();
    navigateToEntryList(singleEvent.eventId);
  }}
/> */}

                   
                    <CardContent >
                      <Box display="flex" justifyContent="space-between" alignItems="center" >
                      {/* <Typography
                        className="card_name"
                        sx={{ fontSize: 16, marginBottom: 0 }}
                        gutterBottom
                        variant="h5"
                        component="div"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      >
                        {singleEvent.eventName}
                      </Typography>
                     <EditOrDelete eventId={singleEvent.eventId} /> */}
                      {/* <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton
                    onClick={() => handleEditEvent(singleEvent.eventId) }                  
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteEvent(singleEvent.eventId)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box> */}
              </Box>
                      <Box  display="flex" alignItems="center" gap="5%" justifyContent="space-between"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      >
                       
                            <Box display="flex" alignItems="center" gap="5%" >
                              <CurrencyRupeeIcon
                                sx={{ fontSize: "20px", color: "#fff" }}
                              />                            
                            <p style={{
                                fontSize: "20px",
                                color: "#fff" }}
                            >
                              {singleEvent.totalAmount}
                            </p>
                          </Box>
                            <Box display="flex"  gap="20%" alignItems="center">
                              <CardGiftcardIcon
                                sx={{ fontSize: "20px", color: "#fff" }}
                              />                             
                            <p
                              style={{
                                fontSize: "20px",
                                color: "#fff",
                              
                              }}
                            >
                               {singleEvent.totalGift}
                          
                            </p>
                            </Box>
                      </Box>
                    </CardContent>
                    
                  </CardActionArea>
                </Card>
            
            ))}
          </>
        )}</Box>
        <CreateNewEvent
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            
          />
           {editModalOpen ? (
            <EditEvent
              eventId={selectedRowId}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
          {deleteModalOpen ? (
            <DeleteEvent
              eventId={selectedRowId}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
            />
          ) : (
            <></>
          )}
        </RefreshContext.Provider>
    );
};

export default EventsList;
