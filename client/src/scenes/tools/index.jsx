import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import { number } from "yup";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";


// import { useAuthContext } from "../../auth";


export const RefreshContext = createContext();

const Tools = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
   
    const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tools, setTools] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedRowId, setSelectedRowId] = useState();
  const [refreshCount, setRefreshCount] = useState(0);
  // const auth = useAuthContext();

  // console.log("Tool List - Role: " + JSON.stringify(auth));

  const updateRefreshCount = () => {
    setRefreshCount(refreshCount + 1);
  };

  function refreshPage() {
    // window.location.reload(false);
    updateRefreshCount();
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

    const columns = [
        { field: "id", headerName: "ID", flex: 0.25, },
        {
            field: "tool_number",
            headerName: "Tool Number",
            flex: 1.75,
            cellClassName: "name-column--cell",
        },
        {
            field: "tool_name",
            headerName: "Tool Name",
            headerAlign: "left",
            align: "left",
            flex: 2.5,
        },
        {
            field: "pm_count",
            headerName: "PM Count",
            flex: 1.5,
            type: number,
        },
        {
            field: "tool_uph",
            headerName: "Tool UPH",
            flex: 1.5,
            type: number,
        },
        {
            field: "part",
            headerName: "Part",
            flex: 0.5,
            type: number,
            // renderCell: ({ row: { access } }) => {
            //     return (
            //         <Box
            //             width="60%"
            //             m="0 auto"
            //             p="5px"
            //             display="flex"
            //             justifyContent="center"
            //             backgroundColor={
            //                 access === "admin"
            //                     ? colors.greenAccent[600]
            //                     : access === "manager"
            //                         ? colors.greenAccent[700]
            //                         : colors.greenAccent[700]
            //             }
            //             borderRadius="4px"
            //         >
            //             {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            //             {access === "manager" && <SecurityOutlinedIcon />}
            //             {access === "user" && <LockOpenOutlinedIcon />}
            //             <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            //                 {access}
            //             </Typography>
            //         </Box>
            //     );
            // },
        },
        {
            field: "count",
            headerName: "Count",
            flex: 1,
            type: number,
        },
        {
            field: "tool_type",
            headerName: "Tool Type",
            flex: 1.5,
        },
        {
            field: "code",
            headerName: "Material Code",
            flex: 2,
        },
        {
        field: "action",
        headerName: "Actions",
        headerAlign: "center",
        align: "center",
        flex: 1.5,
        renderCell: ({ row }) => (
        
        <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton
                    // onClick={auth.role === "admin" ? () => handleEditRow(row) : null}
                    // disabled={auth.role === "admin" ? false : true}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    // onClick={
                    //   auth.role === "admin" ? () => handleDeleteRow(row) : null
                    // }
                    // disabled={auth.role === "admin" ? false : true}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>)
        }
    ];

    const getAllTools = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/tools`).then((response) => {
          // console.log(response);
          console.log(
            "get All Tools in Toolslist : " + JSON.stringify(response.data)
          );
    
          setTools(response.data);
        });
      };
      useEffect(() => {
        getAllTools();
        // console.log("Role in Tool List: " + JSON.stringify(role));
      }, [refreshCount]);
    
    return (
        <RefreshContext.Provider value={{ updateRefreshCount }}>
        <Box m="20px">
            {/* <Header title="Tools" subtitle="List of Tools added" /> */}
            <Box display="flex" alignContent="center" justifyContent="space-between" marginBottom="-4%">
                <Header title="TOOLS"/>

                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        // onClick={auth.role === "admin" ? () => setCreateModalOpen(true) : null}
                        // disabled={auth.role === "admin" ? false : true}
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
                        fontSize: 16
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
                }}
            >
                <DataGrid rows={tools} columns={columns} />
               
            </Box>
        </Box>
        </RefreshContext.Provider>
    );
};

export default Tools;