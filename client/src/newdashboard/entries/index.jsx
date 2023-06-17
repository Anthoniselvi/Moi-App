import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import NewEditEntry from './NewEditEntry';
import DeleteEntry from '../../scenes/entries/DeleteEntry';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import NewDeleteEntry from './NewDeleteEntry';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function NewEntriesList({entries, eventsList, totalAmount, totalGift}) {
  console.log("entries in table column: " + JSON.stringify(entries))
    const [editModalOpen, setEditModalOpen] = useState(false); 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [selectedRowId, setSelectedRowId] = useState()
   


    const handleEditEntry = (entryId) => {
  
        setEditModalOpen(true);
        setSelectedRowId(entryId);
      };

      const handleDeleteEntry = (entryId) => {
        // setAnchorEl(null)
        setDeleteModalOpen(true);
        setSelectedRowId(entryId);
      };
     
  return (
    <>
    <TableContainer component={Paper} sx={{ backgroundColor: '#fff' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell sx={{ color: '#101a34', fontFamily: "Poppins", fontSize: "11px", fontWeight: 600 }}>Person Name</TableCell>
            <TableCell align="left" sx={{ color: '#121212', fontFamily: "Poppins", fontSize: "11px", fontWeight: 600  }}>City</TableCell>
            <TableCell align="left" sx={{ color: '#121212' , fontFamily: "Poppins", fontSize: "11px", fontWeight: 600 }}>Amount</TableCell>
            <TableCell align="left" sx={{ color: '#121212', fontFamily: "Poppins", fontSize: "11px", fontWeight: 600  }}>Gift</TableCell>
            <TableCell align="left" sx={{ color: '#121212', fontFamily: "Poppins", fontSize: "11px", fontWeight: 600  }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((row) => (
            <TableRow
              key={row.entryId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },  borderBottom: "1px solid #e8ecf1" }}
            >
              <TableCell component="th" scope="row" sx={{ color: '#101a34', fontSize: "15px", fontFamily: "Poppins"}}>
                {row.personName}
              </TableCell>
              <TableCell align="left" sx={{ color: '#101a34', fontSize: "15px", fontFamily: "Poppins"}}>{row.city}</TableCell>
              <TableCell align="left" sx={{ color: '#101a34', fontSize: "15px", fontFamily: "Poppins"}}>{row.amount}</TableCell>
              <TableCell align="left" sx={{ color: '#101a34', fontSize: "15px", fontFamily: "Poppins"}}>{row.gift}</TableCell>
              <TableCell align="left" sx={{ display: "flex", gap: "20px", color: '#101a34', fontSize: "15px", fontFamily: "Poppins"}}>
              <div style={{display: "flex", alignItems: "center", gap: "5px",color: "#50bcd9", fontFamily: "Poppins", fontSize: "13px", fontFamily: 600, cursor: "pointer"}} onClick={()=>handleDeleteEntry(row.entryId)}><DeleteOutlinedIcon />Delete </div>
                <div style={{display: "flex", alignItems: "center", gap: "5px",color: "#50bcd9", fontFamily: "Poppins", fontSize: "13px", fontFamily: 600, cursor: "pointer"}} onClick={() => handleEditEntry(row.entryId)}><BorderColorOutlinedIcon />Edit </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {editModalOpen ? (
            <NewEditEntry
              entryId={selectedRowId}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
          {deleteModalOpen ? (
            <NewDeleteEntry
            entryId={selectedRowId}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
            />
          ) : (
            <></>
          )}
    </>
  );
}
