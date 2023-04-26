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

const handleEditEvent = (row) => {
  console.log("Row inside edit button click:" + JSON.stringify(row));
  setEditModalOpen(true);
  setSelectedRow(row);
};
  
      const fetchAllEvents = () => {
        axios
          .get(`http://localhost:1234/events/all/${profileId}`)
          .then((response) => {
            // console.log(response);
            console.log(response.data);
            setEventsList(response.data);
          });
      };
    
      const fetchAllEntries = () => {
        axios.get("http://localhost:1234/entries/all").then((response) => {
          // console.log(response);
          console.log(response.data);
          setEntries(response.data);
        });
      };
      useEffect(() => {
        fetchAllEvents();
        fetchAllEntries();
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
        // <RefreshContext.Provider value={{ updateRefreshCount }}>
        // <Box m="20px">
        // <Box display="flex" alignContent="center" justifyContent="space-between" marginBottom="-4%">
        //         <Header title="EVENTS" />

        //         <Box>
        //             <Button
        //                 sx={{
        //                     backgroundColor: colors.blueAccent[700],
        //                     color: colors.grey[100],
        //                     fontSize: "14px",
        //                     fontWeight: "bold",
        //                     padding: "10px 20px",
        //                 }}
        //                 onClick={() => setCreateModalOpen(true)}
          
        //             >
        //                 <AddIcon sx={{ mr: "10px" }} />
        //                 New
        //             </Button>
        //         </Box>
        //     </Box>
        //     <Box
        //         m="40px 0 0 0"
        //         height="75vh"
        //         sx={{
        //             "& .MuiDataGrid-root": {
        //                 border: "none",
        //             },
        //             "& .MuiDataGrid-cell": {
        //                 borderBottom: "none",
        //             },
        //             "& .name-column--cell": {
        //                 color: colors.greenAccent[300],
        //             },
        //             "& .MuiDataGrid-columnHeaders": {
        //               backgroundColor: colors.blueAccent[2000],
        //               borderBottom: "none",
        //               fontWeight: 700,
        //               fontSize: 18
        //             },
        //             "& .MuiDataGrid-virtualScroller": {
        //                 backgroundColor: colors.primary[400],
        //             },
        //             "& .MuiDataGrid-footerContainer": {
        //                 borderTop: "none",
        //                 // backgroundColor: colors.blueAccent[700],
        //                 backgroundColor: colors.blueAccent[2000],
        //             },
        //             "& .MuiCheckbox-root": {
        //                 color: `${colors.greenAccent[200]} !important`,
        //             },
        //             "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        //                 color: `${colors.grey[100]} !important`,
        //             },
        //         }}
        //     >
        //         <DataGrid 
        //             rows={eventslist}
        //             columns={columns}
        //             getRowId={(row) => row.eventId}
        //             // components={{ Toolbar: GridToolbar }}
        //             initialState={{
        //               pagination: {
        //              paginationModel: {
        //                pageSize: 10,
        //              },
        //            },                  
        //          }}
        //          pageSizeOptions={[10]}
               
        //         />
        //          <div>
        //   <CreateNewParts
        //     open={createModalOpen}
        //     onClose={() => setCreateModalOpen(false)}
        //   />
        //   {editModalOpen ? (
        //     <NewEditPart
        //       row={selectedRow}
        //       open={editModalOpen}
        //       onClose={() => setEditModalOpen(false)}
        //     />
        //   ) : (
        //     <></>
        //   )}
        //   {deleteModalOpen ? (
        //     <NewDeletePopUp
        //       eventId={selectedRowId}
        //       open={deleteModalOpen}
        //       onClose={() => setDeleteModalOpen(false)}
        //     />
        //   ) : (
        //     <></>
        //   )}
        // </div>
    
  
        //     </Box>
        // </Box>
        // </RefreshContext.Provider>
        <RefreshContext.Provider value={{ updateRefreshCount }}>
        <Box display="flex" alignContent="center" justifyContent="space-between" marginBottom="-4%">
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
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap="2%" rowGap="8%" padding="2%">
        {eventslist.length > 0 && (
          <>
            {eventslist.map((singleEvent, eventId) => (
            
                <Card sx={{ border: "1px solid white", backgroundColor: colors.blueAccent[600]  }}> 
                 
                  <CardActionArea>
                  <CardMedia sx={{background: image}}
                        className="card-image-birthday"
                        // height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      />
                   
                    <CardContent className="card_content">
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
                        {singleEvent.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      >
                        <ul className="event-row">
                          <li className="amount-row">
                            <>
                              <CurrencyRupeeIcon
                                sx={{ fontSize: "14px", color: "black" }}
                              />
                              <p
                                style={{
                                  fontSize: "14px",
                                  color: "black",
                                  margin: 2,
                                }}
                              >
                                Amount
                              </p>
                            </>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#9C27B0",
                                margin: 2,
                                alignItems: "right",
                              }}
                            >
                              {/* {getTotalAmount(singleEvent.eventId)} */}
                            </p>
                          </li>
                          <li className="amount-row">
                            <>
                              {/* <CardGiftcardIcon
                                sx={{ fontSize: "14px", color: "black" }}
                              /> */}
                              <p
                                style={{
                                  fontSize: "14px",
                                  color: "black",
                                  margin: 2,
                                }}
                              >
                                {" "}
                                No.of Gifts{" "}
                              </p>
                            </>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "black",
                                margin: 2,
                                alignItems: "right",
                              }}
                            >
                              {/* {gettotalGiftforEvent(singleEvent.eventId)} */}
                            </p>
                          </li>
                        </ul>
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton
                    onClick={() => handleEditEvent(singleEvent) }                  
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
              row={selectedRow}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
          {deleteModalOpen ? (
            <DeleteEvent
              eventId={eventslist.eventId}
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
