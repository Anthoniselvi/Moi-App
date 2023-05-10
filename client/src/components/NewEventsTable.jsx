import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'eventName', label: 'Event Name' },
  { id: 'totalAmount', label: 'Amount' },
  {
    id: 'totalGift',
    label: 'Gift',
   
  },
 
];



export default function NewEventsTable({ eventsList}) {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 240, }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.entryId}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor: "rgb(34, 43, 54)" , color: 'rgba(54, 162, 235)'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{backgroundColor: "rgb(34, 43, 54)", borderBottom: "none"}}>
            {eventsList.map((event) => {
                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >
                     <TableCell sx={{ borderBottom: "none" }}>{event.eventName}</TableCell>
                <TableCell align="left" sx={{ borderBottom: "none" }}>
                  {event.totalAmount}
                </TableCell>
                <TableCell sx={{ borderBottom: "none"}}>₹{event.totalGift}</TableCell>
                  
                  </TableRow>
                )})}
              
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}