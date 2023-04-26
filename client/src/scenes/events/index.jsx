import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme} from "@mui/material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect, createContext } from "react";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import NewEditPart from "./EditEvent";
import NewDeletePopUp from "./DeleteEvent";
import { useSearchParams, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import CreateNewParts from "./CreateEvent";

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

      const handleDeleteRow = (row) => {
        setDeleteModalOpen(true);
        setSelectedRowId(row.id);
      };
    
      const handleEditRow = (row) => {
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
        axios.get("http://localhost:1234/entries").then((response) => {
          // console.log(response);
          console.log(response.data);
          setEntries(response.data);
        });
      };
      useEffect(() => {
        fetchAllEvents();
        fetchAllEntries();
      }, [refreshCount]);

    const columns = [
    
        { field: "eventId", headerName: "Events ID", flex: 1},
        {
            field: "eventType",
            headerName: "Event Type",
            flex: 2,
            cellClassName: "name-column--cell",
        },
        {
            field: "name",
            headerName: "Event Name",
            flex: 2,
            headerAlign: "left",
            align: "left",
        },
        {
          field: "place",
          headerName: "Place",
          flex: 2,
          headerAlign: "left",
          align: "left",
      },
      {
        field: "date",
        headerName: "Date",
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
                  <IconButton onClick={handleEditRow(row)}            
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={handleDeleteRow(row)}
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
        <Box display="flex" alignContent="center" justifyContent="space-between" marginBottom="-4%">
                <Header title="EVENTS" />

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
                    rows={eventslist}
                    columns={columns}
                    // components={{ Toolbar: GridToolbar }}
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
          <CreateNewParts
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
          />
          {editModalOpen ? (
            <NewEditPart
              row={selectedRow}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
          {deleteModalOpen ? (
            <NewDeletePopUp
              partId={selectedRowId}
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

export default EventsList;
