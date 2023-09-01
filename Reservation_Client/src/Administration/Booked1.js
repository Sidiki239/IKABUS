import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import './Booked1.css';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import Menu from '@mui/material/Menu';
import swal from 'sweetalert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      padding: 7,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    padding: 2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      padding: 2,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function Booked1() {
  const [reservations, setReservations] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3002/getreservation');
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.log('Erreur lors de la récupération des réservations :', error);
      }
    };
    fetchReservations();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteReservation = (reservationId) => {
    swal({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette réservation ?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((confirmDelete) => {
      if (confirmDelete) {
        axios.delete(`http://localhost:3002/deleteReservation/${reservationId}`)
          .then((res) => {
            console.log(res);
            swal('Supprimé !', 'La réservation a été supprimée.', 'success');
            // Effectuer d'autres actions après la suppression si nécessaire
          })
          .catch((err) => {
            console.log(err);
            swal('Erreur', 'Une erreur s\'est produite lors de la suppression de la réservation.', 'error');
          });
      }
    });
  };

// ...

const paginatedData = Array.isArray(reservations)
  ? reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  : [];

// ...


  return (
    <div className="table1">
      <br />
      <p><b>Gestion des Réservations</b></p>
      <Link
        to="../actions/AjouterUser"
        style={{
          textAlign: 'right',
          background: 'orange',
          float: 'right',
          fontSize: '12px',
          textDecoration: 'none',
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
        }}
      >
        <b>AJOUTER</b>
      </Link>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Nom</StyledTableCell>
              <StyledTableCell align="center">Prénom</StyledTableCell>
              <StyledTableCell align="center">Nombre de personnes</StyledTableCell>
              <StyledTableCell align="center">Prix</StyledTableCell>
             <StyledTableCell align="center">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((reservation) => {
              const {
                _id,
                nom,
                prenom,
                telephone,
                nombre_personnes,
                prix,
                compagnie,
              } = reservation;
              const isSelected = selectedItemIds.includes(_id);

              return (
                <StyledTableRow key={_id} hover selected={isSelected}>
                  <StyledTableCell align="center">{nom}</StyledTableCell>
                  <StyledTableCell align="center">{prenom}</StyledTableCell>
                  <StyledTableCell align="center">{telephone}</StyledTableCell>
                  <StyledTableCell align="center">{nombre_personnes}</StyledTableCell>
                  <StyledTableCell align="center">{prix}</StyledTableCell>
                  <StyledTableCell align="center">{compagnie}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={handleMenuOpen}>
                      <MenuSharpIcon style={{ color: 'black', fontSize: '18px' }} />
                    </IconButton>
                    <Menu
                      id="demo-positioned-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <IconButton onClick={() => handleDeleteReservation(_id)}>
                        <DeleteIcon style={{ color: 'red', fontSize: '15px' }} />
                      </IconButton>
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        <br />
        <TablePagination
          style={{ width: '100%', background: 'none', color: 'black', margin: 'auto' }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reservations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default Booked1;
