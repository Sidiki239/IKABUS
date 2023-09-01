import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import './Admin1.css'
import MenuIcon from '@mui/icons-material/Menu';
import Mesinfos from './Mesinfos';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

import Tab from '@mui/material/Tab';

import axios from 'axios';

import logo from '../images/logo_final.png';
import PeopleIcon from '@mui/icons-material/People';
import Booked from './Booked';
import Booking from './Booking';
import { AccountCircle, Person } from '@mui/icons-material';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import LockIcon from '@mui/icons-material/Lock';


function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function Admin1() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  
  const [anchorElBadge, setAnchorElBadge] = useState(null);
  const [value, setValue] = useState(0);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
  
    setState({ ...state, right: open });
  };
  
  const [expanded, setExpanded] = useState(false);


  const list = (
  
    <Box
      sx={{ width: 200 , backgroundColor: 'white', height:"100%" ,textAlign:"center" , wordBreak: "break-word"}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <br/><br/>
      
        <Avatar  style={{margin:"auto", fontSize:"40px"}}  />
        <br/>
          <p style={{textAlign:"center" }}> <Person/> { userInfo && userInfo.nom} { userInfo && userInfo.prenom}</p>
        <hr/>
 
        <span style={{ color: 'black',  marginTop :"10px", textAlign:"center" }}>
          
        <Button
        style={{ color: 'orange', textAlign:"center", background:"none", border:"0" }} 
        onClick={() => logout()}
       
       > <LockIcon />Déconnexion   </Button> 
     </span> 


   
    
    
 
    </Box>
   
  );
 
  useEffect(() => {
    // Récupérer le token depuis le localStorage
    const token = window.localStorage.getItem('token');

    // Vérifier que le token existe
    if (token) {
      // Envoyer une requête au backend pour récupérer les informations de l'utilisateur
      axios
        .post('http://localhost:3002/userinfo', { token })
        .then((res) => {
          if (res.data.status === 'ok') {
            // Les informations de l'utilisateur ont été récupérées avec succès
            setUserInfo(res.data.data);

            // Afficher une alerte avec les informations de l'utilisateur
            if (res.data.data === 'token expire') {
              swal('Session expirée !!', 'Vous devez vous reconnecter', 'info');

              setTimeout(() => {
                logout();
              }, 2700);
            }
          } else {
            // Une erreur s'est produite lors de la récupération des informations de l'utilisateur
            console.log(res.data.data);
          }
        })
        .catch((error) => {
          // Une erreur s'est produite lors de la requête
          console.log(error);
        });
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logout = () => {
    window.localStorage.clear();
    window.location.href = '../Administration/Login';
  };

  const openBadge = Boolean(anchorElBadge);
  const idBadge = openBadge ? 'badge-popover' : undefined;


    return (
      <div>
        <div className="wrapper">
          {userInfo ? (
            <div>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar
                position="relative"
                style={{ background: 'transparent', borderRadius: 2, outline: 0 }}
                elevation={1}
              >
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img
                      src={logo}
                      style={{ height: '50px', width: '135px', marginTop: '20px' }}
                      alt="Logo"
                    />
                  </Typography>
                  <br />
                  <div>
                    <br />
                    <Button
                      style={{ background: 'none', border: 0 }}
                      onClick={toggleDrawer(true)}
                    >
                      <IconButton>
                        <MenuIcon style={{ fontSize: 25, color: 'orange' }} />
                      </IconButton>
                    </Button>
                    <SwipeableDrawer
                      anchor="right"
                      open={state.right}
                      onClose={toggleDrawer(false)}
                      onOpen={toggleDrawer(true)}
                    >
                      {list}
                    </SwipeableDrawer>
                  </div>
                </Toolbar>
              </AppBar>
            </Box>
    
            <div className="gestion">
              <br />
              <br />
    
              {value === 0 && <Booking />}
              {value === 1 && userInfo && <Booked userInfo={userInfo} />}
                {value === 2 && <Mesinfos />}
    
              <br />
    
              <Box style={{ width: '100%' }} sx={{ pb: 7 }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                  <BottomNavigation
                  style={{background:"whitesmoke",paddingInline:"10px"}}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    sx={{ color: 'orange' }}
                  >
                    <BottomNavigationAction
                    style={{
                      fontSize: '5px',
                      color: value === 0 ? 'orange' : 'black', // Set the color to orange when selected
                    }}
                  label="Trajets"
                      icon={<ModeOfTravelIcon style={{fontSize:"20px"}} />}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue(0);
                      }}
                    />
    
                    <BottomNavigationAction
                    style={{
                      fontSize: '5px',
                      color: value === 1 ? 'orange' : 'black', // Set the color to orange when selected
                    }}
                    label="Réservations"
                      icon={<PeopleIcon style={{fontSize:"20px"}} />}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue(1);
                      }}
                    />
                   
                    <BottomNavigationAction

                    style={{
                      fontSize: '7px',
                      color: value === 2 ? 'orange' : 'black', // Set the color to orange when selected
                    }}
                    label="Compte"
                      icon={<AccountCircle style={{fontSize:"20px"}} />}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue(2);
                      }}
                    />
                  </BottomNavigation>
                </Paper>
              </Box>
            </div>
            </div>
          ) : (
            <div style={{ justifyContent:"center", 
            alignContent:"center", textAlign:"center", paddingTop:"250px",
             color:"white"}}>Chargement...</div>
          )}
        </div>
      </div>
    );
    
}
export default Admin1;


