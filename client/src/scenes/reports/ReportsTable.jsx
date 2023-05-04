import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'entryId', headerName: 'ID', width: 70 },
  { field: 'personName', headerName: 'Person Name', width: 130 },
  { field: 'city', headerName: 'City', width: 130 },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 90,
  },
  {
    field: 'gift',
    headerName: 'Gift',
    width: 90,
  },
];



export default function ReportsTable({selectedEntries, selectedEvent}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
        <h1>{selectedEvent.name}</h1>
      <DataGrid
        rows={selectedEntries}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}