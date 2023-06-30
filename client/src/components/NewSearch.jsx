import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const VISIBLE_FIELDS = ['personName', 'name', 'amount'];

export default function NewSearch({ searchResult, eventsList }) {
  const columns = React.useMemo(
    () =>
      VISIBLE_FIELDS.map((field) => ({
        field,
        headerName: field === 'personName' ? 'Name' : field === 'name' ? 'EventName' : 'Amount',
        flex: 1,
      })),
    []
  );

  const rows = React.useMemo(() => {
    const filteredSearchResult = searchResult.filter((entry) => entry.amount > 0);
    return filteredSearchResult.map((entry, index) => ({
      id: index + 1,
      personName: entry.personName,
      name: entry.name || '',
      amount: entry.amount || 0,
    }));
  }, [searchResult]);

  console.log(rows); // Output the rows to check if they are populated correctly

  return (
    <Box sx={{ height: "100%", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{
          Toolbar: GridToolbar,
        }}
        toolbarOptions={{ showQuickFilter: true, quickFilterText: 'Search' }}
        sx={{color: "black"}}
      />
    </Box>
  );
}
