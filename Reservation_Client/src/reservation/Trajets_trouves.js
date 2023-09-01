import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Trajets_trouves.css';
import CopyrightIcon from '@mui/icons-material/Copyright';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import QueryBuilderSharpIcon from '@mui/icons-material/QueryBuilderSharp';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import queryString from 'query-string';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNavigation from '@mui/material/BottomNavigation';
import BounceLoader from "react-spinners/BounceLoader";

const Trajets_Trouves = () => {

  const [value, setValue] = React.useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { departure, arrival, date1 } = queryString.parse(location.search);
  const [trajets, setTrajets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState(null);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [place, setPlace] = useState('');
  const [prix, setPrix] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [trajetsPerPage] = useState(5);
  const currentYear = new Date().getFullYear();
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (trajet) => {
    setSelectedTrajet(trajet);
    setShowModal(true);
  };
  const [isScrolled, setIsScrolled] = useState(false);

  // Fonction pour détecter le défilement de la page et mettre à jour l'état "isScrolled"
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Ajoutez un écouteur d'événements pour le défilement de la page
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/trajets?departure=${departure}&arrival=${arrival}`);
        setTrajets(response.data);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des trajets', error);
      }
    };

    fetchData();
  }, [departure, arrival]);

  // Pagination
  const indexOfLastTrajet = currentPage * trajetsPerPage;
  const indexOfFirstTrajet = indexOfLastTrajet - trajetsPerPage;
  const currentTrajets = trajets.slice(indexOfFirstTrajet, indexOfLastTrajet);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const trajetPrice = selectedTrajet.price;
    const calculatedPrice = inputValue * trajetPrice;
    setPlace(inputValue);
    setPrix(calculatedPrice);
  };
  const handleReservation = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/trajets/${selectedTrajet._id}`);
      const trajet = response.data;
      const placesRestantes = trajet.places - trajet.places_reservees;
  
      if (place > placesRestantes) {
        swal('Erreur de réservation', 'Il n\'y a pas suffisamment de places disponibles', 'error');
        return;
      }
  
      // Effectuer la réservation avec les informations nécessaires
      const reservationData = {
        trajetId: selectedTrajet._id,
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        nombre_personnes: place,
        prix:prix,
        compagnie:trajet.compagnie,
        departure:trajet.departure,
        arrival:trajet.arrival,
        hour_departure:trajet.hour_departure,
        hour_arrival:trajet.hour_arrival,
        date2: new Date(trajet.date1).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        
      };
  
      // Envoyer la requête POST pour effectuer la réservation
      const reservationResponse = await axios.post('http://localhost:3002/reservations', reservationData);
  
    
      swal('Réservation effectuée', 'Votre réservation a été enregistrée avec succès', 'success');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la réservation', error);
      swal('Erreur', 'Une erreur s\'est produite lors de la réservation', 'error');
    }
  };
  
  const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();


const [loading , setLoading] = useState(false);

useEffect(() => {
setLoading(true);

setTimeout(() => {
setLoading(false);
}, 4000)

}, [])

let [color, setColor] = useState("#FB7200");
const formattedTime = `${hours}:${minutes}:${seconds}`;
  return (
    <div   >
  
      {loading ? (
      <div className='load' >
   <p style={{color:"black"}}>
        <BounceLoader  color={color} loading={loading} size={60} aria-label='Patientez..' />
        </p></div>
      ) : (
        <>
        <div className='wrapper1'>
          <br />

          <Button
            onClick={() => navigate('../reservation/Reserver')}
            style={{
              background: 'none',
              color: 'orange',
              border: '0',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <ArrowBackIcon /> Retour à la page de réservation..
          </Button>

          <div className={`well ${isScrolled ? 'scrolled' : ''}`}>
            <p style={{ textAlign: 'center' }}>
              VOTRE TRAJET : <b>{departure}</b> <ArrowForwardIcon /> <b>{arrival}</b>
            </p>
          </div>

          {currentTrajets.length > 0 ? (
            <div className='courses-container'>
              {currentTrajets.map((trajet) => (
                <div key={trajet._id} className='course'>
                  <div className='course-info'>
                    <div className='progress-container'>
                      <span className='progress-text'>
                        <b>
                          {new Date(trajet.date1).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </b>
                      </span>
                    </div>
                    <h6>
                      <PeopleSharpIcon style={{ color: 'orange', fontSize: '18px' }} />{' '}
                      <b> {trajet.compagnie} </b>{' '}
                    </h6>
                    <h2>
                      <AccessTimeFilledIcon style={{ color: 'orange', fontSize: '18px' }} />{' '}
                      {trajet.hour_departure} <ArrowForwardIcon style={{ color: 'orange', fontSize: '18px' }} />{' '}
                      {trajet.hour_arrival} |{' '}
                      <EventSeatIcon style={{ color: 'orange', fontSize: '18px' }} /> {trajet.places} Pl. R
                    </h2>
                    <Button className='button1' onClick={() => handleOpenModal(trajet)}>
                      <b>{trajet.price} FCFA</b>
                    </Button>
                  </div>
                </div>
              ))}
              {/* Pagination */}
              <br />
             {/*  <div className='pagination'>
                {Array.from({ length: Math.ceil(trajets.length / trajetsPerPage) }, (_, index) => (
                  <Button className='page' key={index} onClick={() => paginate(index + 1)}>
                    <b>{index + 1}</b>
                  </Button>
                ))}
              </div> */}
            </div>
          ) : (
            <div>
              <div className='well'>
                <p style={{ textAlign: 'center' }}>Aucun trajet correspondant à votre requête.</p>
              </div>
            </div>
          )}

          <Modal show={showModal} onHide={handleCloseModal} className={showModal ? 'fade-in' : ''}>
            <Modal.Header closeButton>
              <Modal.Title> {selectedTrajet && selectedTrajet.compagnie}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedTrajet && (
                <>
                  <p>
                    {' '}
                    <PlaceIcon style={{ color: 'orange' }} /> {selectedTrajet.departure} <ArrowForwardIcon />{' '}
                    {selectedTrajet.arrival}
                  </p>

                  <p>
                    {' '}
                    <DateRangeIcon style={{ color: 'orange' }} />{' '}
                    {new Date(selectedTrajet.date1).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                  </p>
                  <p>
                    {' '}
                    <QueryBuilderSharpIcon style={{ color: 'orange' }} /> {selectedTrajet.hour_departure} -{' '}
                    {selectedTrajet.hour_arrival} | <EventSeatIcon style={{ color: 'orange' }} />{' '}
                    {selectedTrajet.places} Pl R.{' '}
                  </p>

                  <p>Vos informations personnelles</p>
                  <div className='form-inline d-flex align-items-center'>
                    <Form.Group controlId='nom' className='ml-2'>
                      <Form.Control
                        type='text'
                        placeholder='Nom'
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className='w-45'
                      />
                    </Form.Group>

                    <Form.Group controlId='prenom' className='mr-2'>
                      <Form.Control
                        type='text'
                        placeholder='Prénom'
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className='w-45'
                      />
                    </Form.Group>
                  </div>
                  <br />
                  <Form.Group style={{ width: '90%' }} controlId='telephone'>
                    <Form.Label>Téléphone ( Orange Money )</Form.Label>
                    <PhoneInput country={'ml'} value={telephone} onChange={setTelephone} />
                  </Form.Group>

                  <br />
                  <Form.Group controlId='place'>
                    <Form.Label>Nombre de personnes</Form.Label>
                    <Form.Control
                      style={{ width: '40%' }}
                      type='number'
                      placeholder='Personne(s)'
                      value={place}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId='prix'>
                    <Form.Label>Total (FCFA ) </Form.Label>
                    <Form.Control
                      style={{ border: 'none', outline: 'none', color: 'red' }}
                      type='number'
                      value={prix}
                      onChange={(e) => setPrix(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <br />
              <Button className='button3' onClick={handleCloseModal}>
                FERMER
              </Button>
              <Button className='button2' onClick={handleReservation}>
                VALIDER
              </Button>
            </Modal.Footer>
          </Modal>

          <br />
          <Box style={{ width: '100%' }} sx={{ pb: 7 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <br />
                <span style={{ color: 'black', marginTop: '10px' }}>
                  <CopyrightIcon /> <b>{currentYear} </b> <b style={{ color: 'orange' }}>IKABUS </b>
                </span>

                <span style={{ marginLeft: '12px', marginTop: '10px' }}> Tous droits réservés.</span>
              </BottomNavigation>
            </Paper>
          </Box>
    
    </div>
    </>
    )}
  </div>
);
};


export default Trajets_Trouves;
