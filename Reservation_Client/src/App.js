// App.js
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import './App.css'
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Mesinfos from './Administration/Mesinfos';
//import Trajets_Trouves from './reservation/Trajets_trouves';
import AjouterUser from './actions/AjouterUser';
import Login from './Administration/Login';
import LockIcon from '@mui/icons-material/Lock';
import AjouterRoutes from './actions/AjouterRoutes';
import Booked from './Administration/Booked';
import Booking from './Administration/Booking';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './images/logo_final.png';
import { useNavigate , Link } from 'react-router-dom';
import Reserver from './reservation/Reserver';
import CopyrightIcon from '@mui/icons-material/Copyright';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
  import { useState , useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


export function App() {
  
  const currentYear = new Date().getFullYear();
  const day = new Date().getDate();
  const month = new Date().toLocaleDateString('fr-FR', { month: 'long' });
  const year = new Date().getFullYear();
  const data = `${day} ${month} ${year}`;
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

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  // ...


  const list = (
  
    <Box
      sx={{ width: 220 , backgroundColor: 'white', height:"100%"}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <br/>
      <List>
        <ListItem key="login1" disablePadding>
          <ListItemButton >
            <ListItemIcon>
         
            </ListItemIcon>
            <ListItemText primary={data}  />
          </ListItemButton>
        </ListItem>
        <hr/>
        <ListItem disablePadding >
    <Accordion onClick={(event) => event.stopPropagation()} expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
      <AccordionSummary
        
       // aria-controls="panel1a-content"
        id="panel1a-header1"
      >
<p style={{ fontSize :"14px" , margin:"auto",  textAlign:"center" }}><b>Comment réserver ?  <AddIcon/> </b>  </p>  
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
         <p style={{ fontSize :"12.4px" }}><b>1-</b> Cliquez sur "<b>RESERVER</b>" </p> 
         <p style={{ fontSize :"12.4px" }}> <b>2-</b> Saisissez votre  départ et votre arrivée </p>
         <p style={{ fontSize :"12.4px" }}> <b>3-</b>  Choississez votre date de depart et renseignez vos informations </p>
         <p style={{ fontSize :"12.4px" }}><b>4-</b>  Procedez au payement via OrangeMoney </p>
        
        </Typography>
      </AccordionDetails>
    </Accordion>
  </ListItem>



      </List>
      <Divider />
   
      <Box sx={{ width: 200 , backgroundColor: 'white', height:"40"}}>
      <Paper sx={{ position: 'absolute', bottom: 5, left: 5, right: 3, }} elevation={0}>
            <BottomNavigation>
             
        
          <span style={{ color: 'black',  marginTop :"0px", textAlign:"center" }}>
          <b>Espace Admin </b> <br/>  
           <Button
           style={{ color: 'orange', textAlign:"center" }} 
           onClick={() => navigate('./Administration/Login')}
          
          > <LockIcon />Connexion   </Button> 
        </span> 
        
        
            </BottomNavigation>
           
          </Paper>
          </Box>
    
 
    </Box>
   
  );
  
    const [value, setValue] = React.useState(0);
  
        
  const navigate = useNavigate();

 

  return (
    <ThemeProvider theme={theme}>

  <div className='wrapper'>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="relative"  style={{ background :"transparent" , borderRadius:2, outline:"0"}} elevation={1}>
      <Toolbar>
       
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        
        <img src={logo} style={{ height:"50px", width:"135px", marginTop:"20px"}}  alt="Logo" />
        </Typography>
        <br/>
        <div>
        <br/>
        <Button onClick={toggleDrawer(true)}><IconButton >   <MenuIcon style={{ fontSize :25, color:"orange"}}/></IconButton></Button>
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

  <div className="container1">
       
          
       <br/>
       <br/>
        <div className="cover">
          <h3 >Bienvenue sur <b>IKABUS</b></h3>
          <span>
            <span>
              <b>
                <i> </i>
              </b>
            </span>{' '}
            <TypeAnimation
              style={{ color: 'orange' }}
              sequence={[
                'Avec IKABUS',
                1000,
                'Facilement et Rapidement',
                1000,
                'Avec Orange Money',
                1000,
                'Où Que Vous Soyez !!',
                1000,
              ]}
              repeat={Infinity}
            />
          </span>
        
          
          
          
          
          <p  className="button-17 button-glow " onClick={() => navigate('./reservation/Reserver')}>
            <b>RESERVER</b> </p>
       </div>
   
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

 
    </ThemeProvider >
  
  );
}

export default App;
