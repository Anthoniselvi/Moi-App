import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {  useTheme, Typography } from "@mui/material";
import { tokens } from '../theme';


export default function EventsTable({eventsList}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <>
      <Typography variant="h5" fontWeight="600">
        Totals of All Events
      </Typography>
    <TableContainer>
      
    <Table  >
      <TableHead>
        <TableRow>
          <TableCell sx={{ borderBottom: "1px solid colors.grey[100]", borderBottomColor: colors.grey[100], fontWeight:600 }}>Event Name</TableCell>
          <TableCell align="center" sx={{ borderBottom: "1px solid colors.grey[100]", borderBottomColor: colors.grey[100], fontWeight:600  }}>Amount</TableCell>
          <TableCell align="center" sx={{ borderBottom: "1px solid colors.grey[100]", borderBottomColor: colors.grey[100], fontWeight:600  }}>Gift</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {eventsList.map((singleEvent) => {
        //   if (entry.amount > 0) {
        //     const event = eventsList.find((event) => event.eventId === entry.eventId);
            return (
              <TableRow key={singleEvent.eventId}>
                <TableCell sx={{ borderBottom: "none" }}>{singleEvent.eventName}</TableCell>
                <TableCell align="center" sx={{ borderBottom: "none",  }}>
                <div style={{background: "rgba(255, 255, 255, 0.08)", padding: "3px 0px", borderRadius: 20}}>₹{singleEvent.totalAmount}</div>
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "none"}}>{singleEvent.totalGift}</TableCell>
                
              </TableRow>
            );
          }
        
        )}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  );
}