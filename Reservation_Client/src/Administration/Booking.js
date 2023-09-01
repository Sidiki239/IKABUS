import React, { useEffect, useLayoutEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import './Booking.css';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TablePagination from '@mui/material/TablePagination';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import Menu from '@mui/material/Menu';
import {  useTheme } from '@mui/material/styles';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

const StyledTableCell = styled(TableCell)(({ theme }) => {
  const globalTheme = useTheme();

  return {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: 150,

      [globalTheme.breakpoints.down('sm')]: {
        width: 100,
      },
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      padding: 6,

      [globalTheme.breakpoints.down('sm')]: {
        fontSize: 10,
      },
    },
  };
});
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 1 ,
  },
}));

export function Booking() {
  const [trajets, setTrajets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedViewTrajet, setSelectedViewTrajet] = useState(null);

 // const { format } = require('date-fns');
 
  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        const response = await fetch('http://localhost:3002/read');
        const data = await response.json();
        setTrajets(data);
      } catch (error) {
        console.log('Erreur lors de la récupération des trajets:', error);
      }
    };
    fetchTrajets();
  }, []);
  const handleDeleteSelected = (trajet) => {
    swal({
      title: "Confirmation",
      text: "Voulez-vous vraiment supprimer ce trajet ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirmDelete) => {
      if (confirmDelete) {
        Axios.delete(`http://localhost:3002/delete/${trajet._id}`)
          .then((res) => {
            console.log(res);
            swal("Supprimé !", "Le trajet a été supprimé.", "success");
            window.location.reload();
            // Effectuer d'autres actions après la suppression si nécessaire
          })
          .catch((err) => {
            console.log(err);
            swal("Erreur", "Une erreur s'est produite lors de la suppression du trajet.", "error");
          });
      }
    });
  };

  const handleViewClick = (trajet) => {
    setSelectedViewTrajet(trajet);
  };
  
  const handleViewModalClose = () => {
    setShowViewModal(false);
  };
  

  const handleEditClick = (trajet1) => {
    const selectedTrajet = trajets.find((trajet) => trajet === trajet1);
    console.log(selectedTrajet)
    setSelectedTrajet(selectedTrajet);
    setShowModal(true);
    setAnchorEl(null);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTrajet(null);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedData = Array.isArray(trajets) ? trajets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ) : [];
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };
  const [newtrajet, setNewTrajet] = useState({
    date1m: '',
    departurem: '',
    arrivalm: '',
    hour_departurem: '',
    hour_arrivalm: '',
    pricem: '',
    placesm: '',
  });
  useEffect(() => {
    if (selectedTrajet) {
    
      const formattedDate = selectedTrajet.date1 ? format(new Date(selectedTrajet.date1), 'yyyy-MM-dd') : '';
    setNewTrajet({
          date1m: formattedDate,
        departurem: selectedTrajet.departure,
        arrivalm: selectedTrajet.arrival,
        hour_departurem: selectedTrajet.hour_departure,
        hour_arrivalm: selectedTrajet.hour_arrival,
        pricem: selectedTrajet.price,
        placesm: selectedTrajet.places,
      });
    }
  }, [selectedTrajet]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSaveChanges = (id) => {
    Axios.put(`http://localhost:3002/update/${selectedTrajet._id}`, newtrajet,)
    .then((res) => {
      handleModalClose();
      swal('Parfait!', 'Le trajet a été mis à jour !', 'success');
      
      setTimeout(() => {
        window.location.reload();
      }, 2700);
     
    })
    .catch((err) => {
      swal(
        'Erreur',
        "Une erreur s'est produite lors de la mise à jour du trajet",
        'error'
      );
    });
  }
  return (
    <div className="table1">
    <h3 > Gestion des Trajets </h3>
      <Link
        to="../actions/AjouterRoutes"
        style={{
          textAlign: 'right',
          background: 'orange',
         float:"right",
         fontSize :"12px",
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
      <br/>
      
      <TableContainer  component={Paper}>
        <Table  sx={{ maxWidth: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow   >
              <StyledTableCell align="left">Dép.</StyledTableCell>
              <StyledTableCell align="left">Arr.</StyledTableCell>
             {/* <StyledTableCell align="left">Prix/Pls..</StyledTableCell> */} 
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell  align="center">Plus</StyledTableCell> </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((trajet) => {
              const {
                _id,
                date1,
                departure,
                arrival,
                hour_departure,
                hour_arrival,
                price,
                places,
              } = trajet;
           
              return (
                <StyledTableRow
                key={_id}
                hover >
                  <StyledTableCell style={{background:"none", width:"50%" , textAlign:"left"}} component="th" scope="row" align="center">
                   {departure}   <br/><b style={{ color:"red"}}>{hour_departure}</b>  
                </StyledTableCell>
                <StyledTableCell style={{background:"none", width:"100%" , textAlign:"left"}} component="th" scope="row" align="center">
                     {arrival} <br/> <b style={{ color:"red"}}> {hour_arrival}</b>
                </StyledTableCell>
             {/*   <StyledTableCell align="left"> <b>{price} fcfa </b><br/>
                {places} Plc. R.
              </StyledTableCell> */}
                  <StyledTableCell align="left"><b>{formatDate(date1)}</b></StyledTableCell>
                  <StyledTableCell  align="left">
                  <div style={{ display:"flex", }}>
                  <IconButton onClick={() => { handleViewClick(trajet); setShowViewModal(true); }}>
                  <VisibilityIcon style={{ color: 'blue', fontSize: '15px' }} />
                </IconButton>
                
                <IconButton onClick={() => handleEditClick(trajet)}>
                  <EditIcon style={{ color: 'orange', fontSize: '15px' }} />
                </IconButton>
                
                <IconButton onClick={() => handleDeleteSelected(trajet)}>
                  <DeleteIcon style={{ color: 'red', fontSize: '15px' }} />
                </IconButton>
                
    </div>
  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination style={{width :"100%" , background :"none",color:"black", fontSize:"18px"
        , marginTop:"5px", marginBottom:"5px"}}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trajets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le trajet</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {selectedTrajet && (
            <Form >
           <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
              type="date"
              name="date1m"
              value={newtrajet.date1m}
              onChange={(e) =>
                setNewTrajet({
                  ...newtrajet,
                  date1m: e.target.value,
                })
              }
              />

            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Départ</Form.Label>
              <Form.Control
                type="text"
                name="departurem"
                value={newtrajet.departurem}
                defaultValue={selectedTrajet.departure}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    departurem: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Arrivée</Form.Label>
              <Form.Control
                type="text"
                name="arrivalm"
                value={newtrajet.arrivalm}
                defaultValue={selectedTrajet.arrival}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    arrivalm: e.target.value,  })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Heure de départ</Form.Label>
              <Form.Control
                type="time"
                name="hour_departurem"
                value={newtrajet.hour_departurem}
                defaultValue={selectedTrajet.hour_departure}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    hour_departurem: e.target.value,})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Heure d'arrivée</Form.Label>
              <Form.Control
                type="time"
                name="hour_arrivalm"
                value={newtrajet.hour_arrivalm}
                defaultValue={selectedTrajet.hour_arrival}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    hour_arrivalm: e.target.value,  }) } 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="pricem"
                value={newtrajet.pricem}
                defaultValue={selectedTrajet.price}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    pricem: e.target.value, }) }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Places</Form.Label>
              <Form.Control
                type="number"
                name="placesm"
                value={newtrajet.placesm}
                defaultValue={selectedTrajet.places}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    placesm: e.target.value,
                  })}
              />
            </Form.Group>
          </Form>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Fermer
          </Button>
          <Button
            variant="warning"
            onClick={() => handleSaveChanges(selectedTrajet._id)}
          >  Enregistrer </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showViewModal} onHide={handleViewModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Informations du trajet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedViewTrajet && (
          <div>
        
          <p>Date : {selectedViewTrajet.date1 ? format(new Date(selectedViewTrajet.date1), 'dd/MM/yyyy') : ''}</p>
          <p>Départ : {selectedViewTrajet.departure}</p>
            <p>Arrivée : {selectedViewTrajet.arrival}</p>
            <p>Heure de départ : {selectedViewTrajet.hour_departure}</p>
            <p>Heure d'arrivée : {selectedViewTrajet.hour_arrival}</p>
            <p>Prix : {selectedViewTrajet.price} fcfa</p>
            <p>Places disponibles : {selectedViewTrajet.places}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleViewModalClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
    
    </div>
  );
}
export default Booking
