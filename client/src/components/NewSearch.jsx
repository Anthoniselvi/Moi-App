import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function NewSearch({searchResult}) {
  // console.log("eventsList in NewSearch : " + JSON.stringify(eventsList))
  console.log("searchResult in NewSearch : " + JSON.stringify(searchResult))
  const columns = [
    // { field: "_id", headerName: "ID", flex: 0.25 },
    { field: 'personName', headerName: 'Name' },
    // { field: 'name', headerName: 'EventName' },
    { field: 'amount', headerName: 'Amount' },
 
  ];
  const rows = searchResult.map((row) => ({ ...row, id: row._id }));

  return (
    <Box 
    sx={{
      height: 400, width: 1 , 
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .name-column--cell": {
        color: "red",
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "lightblue",
        color: "#121212",
        borderBottom: "none",
        fontWeight: 700,
        fontSize: 16,
      },
      "& .MuiButton-text": {
        color: "#121212",
        // background: "green"
      },
      "& .MuiInput-input": {
        color: "black"
      },
      "& .MuiSvgIcon-root": {
        color: "black"
      },
      "& .MuiInput-underline": {
        color: "black"
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: "#f5f7fa",
        color: "#121212"
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        // backgroundColor: colors.blueAccent[700],
        backgroundColor: "lightyellow",
      },
      "& .MuiCheckbox-root": {
        color: "black",
      },
    }}>
      <DataGrid
        rows={rows} 
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
       
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}