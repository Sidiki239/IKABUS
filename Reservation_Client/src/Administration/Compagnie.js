import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import './Booking.css';
import swal from 'sweetalert';
import AjouterRoutes from '../actions/AjouterRoutes';
import { Link } from 'react-router-dom';
import SupprimerRoutes from '../actions/SupprimerRoutes';
import ModifierRoutes from '../actions/ModifierRoutes';
import VoirRoutes from '../actions/VoirRoutes';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TablePagination from '@mui/material/TablePagination';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

export function Booking() {
  const [trajets, setTrajets] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState(null);

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

  const handleRowClick = (itemId) => {
    if (selectedItemIds.includes(itemId)) {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
    } else {
      setSelectedItemIds([...selectedItemIds, itemId]);
    }
  };

  const handleDeleteSelected = (itemId) => {
    console.log('Delete selected item:', itemId);
  };

  const handleEditClick = (trajet) => {
    setSelectedTrajet(trajet);
    setShowModal(true);
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

  const paginatedData = trajets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

  const handleSaveChanges = (id) => {
  
    Axios.put("http://localhost:3002/update/${selectedTrajet._id}", {
    id : selectedTrajet._id,
    newtrajet : newtrajet
  })
  
      .then((res) => {
        console.log(res);
      
        swal('Parfait!', 'Le trajet a été mis à jour !', 'success');
      })
      .catch((err) => {
        console.log(err);
       
        swal(
          'Erreur',
          "Une erreur s'est produite lors de la mise à jour du trajet",
          'error'
        );
      });
  };

  return (
    <div className="Booking">
      <br />
      <Link
        to="./Login"
        style={{
          textAlign: 'right',
          background: 'orange',
          marginLeft: '75%',
          textDecoration: 'none',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        <b>AJOUTER</b>
      </Link>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItemIds.length > 0 &&
                    selectedItemIds.length < paginatedData.length
                  }
                  checked={
                    paginatedData.length > 0 &&
                    selectedItemIds.length === paginatedData.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItemIds(paginatedData.map((item) => item._id));
                    } else {
                      setSelectedItemIds([]);
                    }
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="left">Trajet</StyledTableCell>
              <StyledTableCell align="center">
                Heure de départ
              </StyledTableCell>
              <StyledTableCell align="center">
                Heure d'arrivée
              </StyledTableCell>
              <StyledTableCell align="center">Prix</StyledTableCell>
              <StyledTableCell align="center">Places</StyledTableCell>
              <StyledTableCell align="center">Options</StyledTableCell>
            </TableRow>
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
              const isSelected = selectedItemIds.includes(_id);

              return (
                <StyledTableRow
                  key={_id}
                  hover
                  selected={isSelected}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(_id);
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {formatDate(date1)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {departure} <ArrowForwardIcon /> {arrival}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {hour_departure}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {hour_arrival}
                  </StyledTableCell>
                  <StyledTableCell align="right">{price}</StyledTableCell>
                  <StyledTableCell align="right">{places}</StyledTableCell>
                  <StyledTableCell align="right">
                    {isSelected ? (
                      <IconButton onClick={() => handleDeleteSelected(_id)}>
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton
                          onClick={(e) => e.stopPropagation()}
                        >
                          <VisibilityIcon style={{ color: 'blue' }} />
                        </IconButton>
                        <IconButton onClick={() => handleEditClick(trajet)}>
                          <EditIcon style={{ color: 'orange' }} />
                        </IconButton>
                      </>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
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
        <Modal.Body>
          {selectedTrajet && (
            <Form>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date1m"
                defaultValue={selectedTrajet.date1}
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
                defaultValue={selectedTrajet.arrival}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    arrivalm: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Heure de départ</Form.Label>
              <Form.Control
                type="time"
                name="hour_departurem"
                defaultValue={selectedTrajet.hour_departure}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    hour_departurem: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Heure d'arrivée</Form.Label>
              <Form.Control
                type="time"
                name="hour_arrivalm"
                defaultValue={selectedTrajet.hour_arrival}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    hour_arrivalm: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="pricem"
                defaultValue={selectedTrajet.price}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    pricem: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Places</Form.Label>
              <Form.Control
                type="number"
                name="placesm"
                defaultValue={selectedTrajet.places}
                onChange={(e) =>
                  setNewTrajet({
                    ...newtrajet,
                    placesm: e.target.value,
                  })
                }
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
            variant="primary"
            onClick={() => handleSaveChanges(selectedTrajet._id)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Compagnie