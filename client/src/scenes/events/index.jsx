import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme} from "@mui/material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect, createContext } from "react";
import { Delete, Edit } from "@mui/icons-material";
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
import image from "./image.png"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export const RefreshContext = createContext();

const EventsList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [searchParam] = useSearchParams();
      const profileId = searchParam.get("profile");
      const [eventslist, setEventsList] = useState([])
      const [entries, setEntries] = useState([])
      const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedRowId, setSelectedRowId] = useState();
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalGift, setTotalGift] = useState(0)
  const [total, setTotal] = useState()
      const navigate = useNavigate()

  const [refreshCount, setRefreshCount] = useState(0);
 
    const updateRefreshCount = () => {
      setRefreshCount(refreshCount + 1);
    };
  
    function refreshPage() {
      updateRefreshCount();
    }
  
  
      const navigateToCreate = () => {
        navigate(`/events/new?profile=${profileId}`);
      }
const navigateToEntryList = (eventId) => {
  navigate(`/entries?event=${eventId}`)
}
const handleDeleteEvent = (eventId) => {
  setDeleteModalOpen(true);
  setSelectedRowId(eventId);
};

const handleEditEvent = (eventId) => {

  setEditModalOpen(true);
  setSelectedRowId(eventId);
};
  
// const getTotalAmount = (eventId) => {
//   console.log(eventId);

//   axios.get(`http://localhost:1234/entries/all/${eventId}`).then((response) => {
//           // console.log(response);
//           console.log(response.data);
//           // setEntries(response.data);
//           setTotalAmount(response.data.totalAmount)
//           setTotalGift(response.data.totalGift)
//         });

//   return totalAmount
// };

// const getTotalGift= (eventId) => {
//   console.log(eventId);

//   axios.get(`http://localhost:1234/entries/all/${eventId}`).then((response) => {
//           // console.log(response);
//           console.log(response.data);
      
//           setTotalGift(response.data.totalGift)
//         });

//   return totalGift
// };
      // const fetchAllEvents = () => {
      //   axios
      //     .get(`http://localhost:1234/events/all/${profileId}`)
      //     .then((response) => {
      //       // console.log(response);
      //       console.log(response.data);
      //       setEventsList(response.data);
      //     });
      // };
    
      // const fetchAllEntries = () => {
      //   axios.get("http://localhost:1234/entries/all").then((response) => {
      //     // console.log(response);
      //     console.log(response.data);
      //     setEntries(response.data);
      //   });
      // };
      const fetchTotals = () => {
        axios.get(`http://localhost:1234/entries/total/${profileId}`).then((response) => {
          // console.log(response);
         
          console.log("Totals : " + JSON.stringify(response.data));
         setEventsList(response.data)
          // setTotalAmount(response.data.totalAmount)
          // setTotalGift(response.data.totalGift)
        });
      };
      useEffect(() => {
        // fetchAllEvents();
        // fetchAllEntries();
        fetchTotals()
      }, [refreshCount]);

    // const columns = [
    
    //     { field: "eventId", headerName: "Events ID", flex: 1},
    //     {
    //         field: "eventType",
    //         headerName: "Event Type",
    //         flex: 2,
    //         cellClassName: "name-column--cell",
    //     },
    //     {
    //         field: "name",
    //         headerName: "Event Name",
    //         flex: 2,
    //         headerAlign: "left",
    //         align: "left",
    //     },
    //     {
    //       field: "place",
    //       headerName: "Place",
    //       flex: 2,
    //       headerAlign: "left",
    //       align: "left",
    //   },
    //   {
    //     field: "date",
    //     headerName: "Date",
    //     flex: 2,
    //     headerAlign: "left",
    //     align: "left",
    // },
    //     {
    //         field: "action",
    //         headerName: "Actions",
    //         headerAlign: "center",
    //         align: "center",
    //         flex: 3,
    //         renderCell: ({ row }) => (
    //             <>
    //            <Box sx={{ display: "flex", gap: "1rem" }}>
    //             <Tooltip arrow placement="left" title="Edit">
    //               <IconButton onClick={()=>handleEditRow(row)}            
    //               >
    //                 <Edit />
    //               </IconButton>
    //             </Tooltip>
    //             <Tooltip arrow placement="right" title="Delete">
    //               <IconButton
    //                 color="error"
    //                 onClick={() =>handleDeleteEvent(row)}
    //                  >
    //                 <Delete />

    //               </IconButton>
    //             </Tooltip>
    //           </Box>
    //             </>
    //         )
    //     }
        
    // ];

  

    return (
        
        <RefreshContext.Provider value={{ updateRefreshCount }}>
        <Box display="flex" alignContent="center" justifyContent="space-between" margin= "2%" marginBottom= "0%">
                <Header title="EVENTS LIST"   />
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
                  <CardMedia component="img"
  // src={image} sx={{height: 150, backgroundSize: "contain"}}
                        className="card-image-birthday"
                        // height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      />
                   
                    <CardContent >
                      <Box display="flex" justifyContent="space-between" alignItems="center" >
                      <Typography
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
                      <Box sx={{ display: "flex", gap: "1rem" }}>
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
              </Box>
              </Box>
                      <Box 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      >
                        <ul style={{listStyle: "none", alignItems: "left" , display: "flex" , flexDirection: "column"}}>
                          <li style={{display:"flex" , alignItems:"left", justifyContent: "space-between", marginTop:"2%", marginBottom: "2%" }}>
                            <Box display="flex" alignItems="left" gap="5%" color="#fff" justifyContent= "space-between" >
                              <CurrencyRupeeIcon
                                sx={{ fontSize: "16px", color: "#fff" }}
                              />
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#fff",
                                  margin: 2,
                                }}
                              >
                                Amount
                              </p>
                            </Box>
                            <p
                              style={{
                                fontSize: "20px",
                                color: "#fff",
                                margin: 2,
                                alignItems: "right",
                              }}
                            >
                              {singleEvent.totalAmount}
                              {/* {getTotalAmount(singleEvent.eventId)} */}
                            </p>
                          </li>
                          <li style={{display:"flex" , alignItems:"center", justifyContent: "space-between"}}>
                            <Box display="flex"  gap="5%" alignItems="center" justifyContent= "space-between">
                              <CardGiftcardIcon
                                sx={{ fontSize: "16px", color: "#fff" }}
                              />
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#fff",
                                  margin: 2,
                                }}
                              >                              
                                Gifts
                              </p>
                            </Box>
                            <p
                              style={{
                                fontSize: "20px",
                                color: "#fff",
                                margin: 2,
                                alignItems: "right",
                              }}
                            >
                               {singleEvent.totalGift}
                              {/* {getTotalGift(singleEvent.eventId)} */}
                            </p>
                          </li>
                        </ul>
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
