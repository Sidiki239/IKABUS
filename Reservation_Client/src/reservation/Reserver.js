import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import App from '../App';
import swal from 'sweetalert';
import './Reserver.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import CopyrightIcon from '@mui/icons-material/Copyright';
import logo from '../images/logo_final.png';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import theme from '../theme';


import RingLoader from "react-spinners/RingLoader";


const Reserver = () => {

 

  const [value, setValue] = React.useState(0);
  
  const currentYear = new Date().getFullYear();
  const day = new Date().getDate();
  const month1 = new Date().getMonth();
  const month = new Date().toLocaleDateString('fr-FR', { month: 'long' });
  const year = new Date().getFullYear();
  const data = `${day} ${month} ${year}`;


 // const history = useHistory();
  const [departures, setDepartures] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const [foundTrajets, setFoundTrajets] = useState([]);
  const navigate = useNavigate();
  const [post, setPost] = useState({
    departure: '',
    arrival: '',
    date1:currentDate
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDepartures = await fetch('http://localhost:3002/departures');
        const departures = await responseDepartures.json();
        setDepartures(departures);

        const responseArrivals = await fetch('http://localhost:3002/arrivals');
        const arrivals = await responseArrivals.json();
        setArrivals(arrivals);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données', error);
      }
    };

    fetchData();
  }, []);

 
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Vérifier que tous les champs sont remplis
    const { departure, arrival } = post;
    if (!departure || !arrival ) {
      swal('Erreur', 'Veuillez remplir tous les champs', 'error');
      
    } else {
      const newSearch = {
        departure: post.departure,
        arrival: post.arrival,
       
      };

      const searchParams = new URLSearchParams({
        departure: departure,
        arrival: arrival,
      
      });

      const url = `/reservation/Trajets_trouves?${searchParams.toString()}`;

    
      axios
        .post('http://localhost:3002/search', newSearch)
        .then((res) => {
          if (res.data.length === 0) {
            swal('Aucun trajet trouvé', 'Veuillez effectuer une nouvelle recherche', 'info');
            setFoundTrajets([]); // Réinitialiser les trajets trouvés
          } else {
           // swal('Patientez..', 'Vous serez redirigé ', 'success');
            setFoundTrajets(res.data); // Stocker les trajets trouvés
            navigate(url); // Rediriger vers la page Trajets_trouves
          }
        }).catch((err) => {
          console.log(err);
          swal('Erreur', 'Une erreur est survenue lors de l\'ajout du trajet', 'error');
        });
    }
  };


const [loading , setLoading] = useState(false);

useEffect(() => {
setLoading(true);

setTimeout(() => {
setLoading(false);
}, 2500)

}, [])

let [color, setColor] = useState("#FB7200");
  const placeholder ="Votre départ.."
  // ...
  return (
    <ThemeProvider theme={theme}>


    {loading ? (
      <div className='load' >
  
        <RingLoader  color={color} loading={loading} size={60} aria-label='Patientez..' />
      </div>
      ) : (
        <>
<div className='wrapper'>


    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="relative"  style={{ background :"transparent" }} elevation={1} >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        
        <img src={logo} style={{ height:"50px", width:"135px", marginTop:"20px"}}  alt="Logo" />
        </Typography>
        
        <div>
        <br/>
        <Button style={{ color:"orange", background:"none", fontSize:"12px", border:"none"}} >  {data}</Button>
      
      </div>
      </Toolbar>
    </AppBar>
  </Box>



    
      <div className="center">
      
       <h3><b>Où allez-vous ?</b> <LocationOnIcon style={{fontSize:"28px"}} /></h3>
        <form>
          <div className="txt_field" style={{ border: '0.7px solid black', borderRadius: '4px' }}>
            <Typeahead
              id="basic-example"
              options={departures}
              name='departure'
              value={post.departure}
              placeholder={placeholder}
              onChange={(selected) => handleChange({ target: { name: 'departure', value: selected[0] || '' } })}
              highlightOnlyResult={true}
            />
          </div>
          <div className="txt_field" style={{ border: '0.7px solid black', borderRadius: '4px' }}>
            <Typeahead
              id="basic-example"
              options={arrivals}
              name='arrival'
              value={post.arrival}
              onChange={(selected) => handleChange({ target: { name: 'arrival', value: selected[0] || '' } })}
              placeholder="Votre arrivée.."
            />
          </div>
         
          <Button className="submit" type="submit" onClick={handleSearch}>
            <b>RECHERCHER</b>    <SearchIcon style={{color:'white'}} />
          </Button>
          <div className="signup_link">
            <a style={{color:"orange"}} href="../"><b>RETOUR</b></a>
          </div>
        </form>
      </div>

      <Box  style={{width:"100%"}} sx={{ pb: 7 }} >
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
       <br/>
      <span style={{ color: 'black',  marginTop :"10px" }}>
      <CopyrightIcon /> <b>{currentYear} </b>    <b style={{ color: 'orange' }}>IKABUS   </b> 
    </span> 
    <span style={{ marginLeft : "12px" , marginTop :"10px" }}  >      Tous  droits réservés.</span>
       
        </BottomNavigation>
       
      </Paper>
    </Box>
    </div>
    </>
    )}
  </ThemeProvider>
  );
};

export default Reserver;
