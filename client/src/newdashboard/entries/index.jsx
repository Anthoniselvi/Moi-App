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
import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function NewEntriesList({ entries, eventsList, totalAmount, totalGift }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditEntry = (entryId) => {
    setEditModalOpen(true);
    setSelectedRowId(entryId);
  };

  const handleDeleteEntry = (entryId) => {
    setDeleteModalOpen(true);
    setSelectedRowId(entryId);
  };

  const isMobile = useMediaQuery('(max-width:1000px)');

  const renderDropdownOptions = (row) => {
    return (
      <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <StyledMenu sx={{"& .MuiPopover-paper": {
        backgroundColor: "#fff", 
      }}}
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
          backgroundColor: "#fff"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{color: "#121212", cursor: "pointer"}} onClick={() => handleEditEntry(row.entryId)} disableRipple>
          <EditIcon style={{color: "#121212"}} />
          Edit
        </MenuItem>
        <MenuItem sx={{color: "#121212", cursor: "pointer"}} onClick={() => handleDeleteEntry(row.entryId)} disableRipple>
          <DeleteOutlinedIcon style={{color: "#121212"}}/>
          Delete
        </MenuItem>
       
      </StyledMenu>
    </div>
    );
  };

  const renderEditDeleteButtons = (row) => {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#50bcd9', fontFamily: 'Poppins', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleDeleteEntry(row.entryId)}>
          <DeleteOutlinedIcon />
          Delete
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#50bcd9', fontFamily: 'Poppins', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleEditEntry(row.entryId)}>
          <BorderColorOutlinedIcon />
          Edit
        </div>
      </>
    );
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: '#fff' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "20%", color: '#101a34', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600 }}>Name</TableCell>
              <TableCell align="left" sx={{ width: "20%", color: '#121212', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600 }}>City</TableCell>
              <TableCell align="left" sx={{ width: "20%", color: '#121212', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600 }}>Amount</TableCell>
              <TableCell align="left" sx={{ width: "20%", color: '#121212', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600 }}>Gift</TableCell>
              <TableCell align="left" sx={{ width: "20%", color: '#121212', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((row) => (
              <TableRow
                key={row.entryId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: '1px solid #e8ecf1' }}
              >
                <TableCell component="th" scope="row" sx={{ width: "20%", color: '#101a34', fontSize: '15px', fontFamily: 'Poppins' }}>
                  {row.personName}
                </TableCell>
                <TableCell align="left" sx={{ width: "20%", color: '#101a34', fontSize: '15px', fontFamily: 'Poppins' }}>{row.city}</TableCell>
                <TableCell align="left" sx={{ width: "20%", color: '#101a34', fontSize: '15px', fontFamily: 'Poppins' }}>{row.amount}</TableCell>
                <TableCell align="left" sx={{ width: "20%", color: '#101a34', fontSize: '15px', fontFamily: 'Poppins' }}>{row.gift}</TableCell>
                <TableCell align="left" sx={{ width: "20%", display: 'flex', gap: '20px', color: '#101a34', fontSize: '15px', fontFamily: 'Poppins' }}>
                  {isMobile ? renderDropdownOptions(row) : renderEditDeleteButtons(row)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editModalOpen ? (
        <NewEditEntry entryId={selectedRowId} open={editModalOpen} onClose={() => setEditModalOpen(false)} />
      ) : (
        <></>
      )}
      {deleteModalOpen ? (
        <NewDeleteEntry entryId={selectedRowId} open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} />
      ) : (
        <></>
      )}
    </>
  );
}
