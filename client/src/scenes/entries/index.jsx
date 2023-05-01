
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { GridFooterContainer, GridFooter } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme} from "@mui/material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect, createContext } from "react";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
// import NewEditPart from "./EditPart";
// import NewDeletePopUp from "./DeletePart";

import AddIcon from '@mui/icons-material/Add';
// import CreateNewParts from "./CreatePart";
import { useNavigate, useSearchParams } from "react-router-dom";
import CreateNewEntry from "./CreateNewEntry";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export const RefreshContext = createContext();

const EntriesList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const [entries, setEntries] = useState([]);
 const [eventsList, setEventsList] = useState({})
    const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(); 
  const [selectedRowId, setSelectedRowId] = useState();
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalGift, setTotalGift] = useState(0)

  const [refreshCount, setRefreshCount] = useState(0);

 
  
    const updateRefreshCount = () => {
      setRefreshCount(refreshCount + 1);
    };
  
    // function refreshPage() {
    //   updateRefreshCount();
    // }
  
    const handleDeleteRow = (row) => {
      setDeleteModalOpen(true);
      setSelectedRowId(row.entryId);
    };
  
    const handleEditRow = (row) => {
      console.log("Row inside edit button click:" + JSON.stringify(row));
      setEditModalOpen(true);
      setSelectedRow(row);
    };

    function CustomFooter () {
      return (
        <GridFooterContainer sx={{fontSize: 20}}>
          Total Amount : {totalAmount}, Total No.of Gifts : {totalGift}
          <GridFooter sx={{
            border: 'none', // To delete double border.
            }} />
        </GridFooterContainer>
      );
    }
   
    const navigateToEventsPage = () => {
      axios.get(`http://localhost:1234/events/single/${eventId}`).then((response) => {
      // console.log(response);
     
      console.log("Totals : " + JSON.stringify(response.data));
      // setProfileId(response.data.profileId);
      navigate(`/events?profile=${response.data.profileId}`)
    });
   
    }
    const getSelectedEvent = () => {
        axios
          .get(`http://localhost:1234/events/single/${eventId}`)
          .then((response) => {
            // console.log(response);
            console.log(response.data);
            setEventsList(response.data);
          });
      };
    
      const fetchAllEntries = () => {
        axios.get(`http://localhost:1234/entries/all/${eventId}`).then((response) => {
          // console.log(response);
          // console.log("fetchAllEntries : " + JSON.stringify(response.data));
          console.log("fetchAllEntries : " + JSON.stringify(response.data.entriesList));
          console.log("totalAmount : " + JSON.stringify(response.data.totalAmount));
          setEntries(response.data.entriesList);
          setTotalAmount(response.data.totalAmount)
          setTotalGift(response.data.totalGift)
        });
      };
      useEffect(() => {
        getSelectedEvent();
        fetchAllEntries();
      }, [refreshCount]);
    const columns = [
    
        // { field: "entryId", headerName: "Entry ID", flex: 1},
        {
            field: "personName",
            headerName: "Person Name",
            flex: 2,
            cellClassName: "name-column--cell",
        },
        {
            field: "city",
            headerName: "City",
            flex: 2,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "presentType",
            headerName: "Present Type",
            flex: 2,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 2,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "gift",
            headerName: "Gift",
            flex: 2,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "action",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 3,
            renderCell: ({ row }) => (
                <>
               <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton
                    onClick={() => handleEditRow(row) }                  
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
                </>
            )
        }
        
    ];


    return (
        <RefreshContext.Provider value={{ updateRefreshCount }}>
        <Box m="20px">
        <KeyboardBackspaceIcon onClick={navigateToEventsPage}/>
      
        <Box display="flex" alignContent="center" justifyContent="space-between" marginBottom="-4%">
                <Header title={eventsList.name}   />
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
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[2000],
                      borderBottom: "none",
                      fontWeight: 700,
                      fontSize: 18
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        // backgroundColor: colors.blueAccent[700],
                        backgroundColor: colors.blueAccent[2000],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid 
                    rows={entries}
                    columns={columns}
                  
                    getRowId={(row) => row.entryId} 
              
                 components={{ Toolbar: GridToolbar,  Footer: CustomFooter  }}
                    initialState={{
                       pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    }, 
                                   
                  }}
                  pageSizeOptions={[10]}
                />
                 <div>
          <CreateNewEntry
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            eventId={eventId}
          />
          {editModalOpen ? (
            <EditEntry
              row={selectedRow}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
          {deleteModalOpen ? (
            <DeleteEntry
              entryId={selectedRowId}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
            />
          ) : (
            <></>
          )}
        </div>
    
  
            </Box>
        </Box>
        </RefreshContext.Provider>
    );
};

export default EntriesList;
