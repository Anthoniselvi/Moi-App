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
  { id: 'personName', label: 'Name' },
  { id: 'name', label: 'EventName' },
  {
    id: 'amount',
    label: 'Amount',
   
  },
 
];



export default function NewSearchTable({searchResult, eventsList}) {


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
                  style={{ minWidth: column.minWidth,backgroundColor: "rgb(36, 153, 239)", color:'black' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{backgroundColor: "#f5f7fa", color: "black", borderBottom: "none"}}>
            {searchResult.map((entry) => {
                if (entry.amount > 0) {
                    const event = eventsList.find((event) => event.eventId === entry.eventId);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >
                     <TableCell sx={{ borderBottom: "none", color: "black" }}>{entry.personName}</TableCell>
                <TableCell align="left" sx={{ borderBottom: "none", color: "black" }}>
                  {event ? event.eventName : null}
                </TableCell>
                <TableCell sx={{ borderBottom: "none", color: "black"}}>₹{entry.amount}</TableCell>
                    {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}
                  </TableRow>
                )}})}
              
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}