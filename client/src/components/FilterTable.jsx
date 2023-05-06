import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {  useTheme } from "@mui/material";
import { tokens } from '../theme';


export default function FilterTable({filteredEntries, eventsList}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <TableContainer>
    <Table  >
      <TableHead>
        <TableRow>
          <TableCell sx={{ borderBottom: "1px solid colors.grey[100]", borderBottomColor: colors.grey[100], fontWeight:600 }}>Name</TableCell>
          <TableCell sx={{ borderBottom: "1px solid colors.grey[100]", borderBottomColor: colors.grey[100], fontWeight:600  }}>Event</TableCell>
          <TableCell sx={{ borderBottom: "1px solid colors.grey[100]", borderBottomColor: colors.grey[100], fontWeight:600  }}>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredEntries.map((entry) => {
          if (entry.amount > 0) {
            const event = eventsList.find((event) => event.eventId === entry.eventId);
            return (
              <TableRow key={entry.entryId}>
                <TableCell sx={{ borderBottom: "none" }}>{entry.personName}</TableCell>
                <TableCell align="left" sx={{ borderBottom: "none" }}>
                  {event ? event.eventName : null}
                </TableCell>
                <TableCell sx={{ borderBottom: "none"}}>₹{entry.amount}</TableCell>
                
              </TableRow>
            );
          }
          return null;
        })}
      </TableBody>
    </Table>
  </TableContainer>
  
  );
}