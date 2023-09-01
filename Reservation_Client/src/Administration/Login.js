import './Login.css'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import App from '../App';
import BottomNavigation from '@mui/material/BottomNavigation';
import CopyrightIcon from '@mui/icons-material/Copyright';
import logo from '../images/logo_final.png';
import { Padding, Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
function Copyright(props) {
  const navigate = useNavigate()
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
    <Button style={{textAlign :"center" , color:"orange"}} onClick={() => navigate("../")}>Retour</Button>
    </Typography>
  );
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

 function Login() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const handleClick = (event) => {
    event.preventDefault();
    // Vérifier que tous les champs sont remplis
    const { email, password } = post;
    if (!email || !password) {
      swal('Erreur', 'Veuillez remplir tous les champs', 'error');
      return;
    }
    // Vérifier que l'e-mail est valide
    if (!validateEmail(email)) {
      swal('Erreur', 'Veuillez saisir une adresse e-mail valide', 'error');
      return;
    }
    const userInfo = null; // Déplacez cette déclaration ici
    const newUser = {
      email: post.email,
      password: post.password,
    };

    Axios.post('http://localhost:3002/login', newUser)
      .then((res) => {
        // console.log(res);
        if (res.data.error === "User not found") {
          swal('Utilisateur non trouvé', 'Veuillez vérifier vos informations', 'error');
        } else if (res.data.error === "Invalid password") {
          swal('Mot de passe incorrect', 'Veuillez vérifier vos informations', 'error');
        } else {
          swal('Connexion réussie', 'Parfait', 'success').then(() => {
           
            window.localStorage.setItem("token", res.data.data);
            window.localStorage.setItem("loggedIn", true);
            // eslint-disable-next-line
            if (userInfo && userInfo.type === 'admin') {
              // Rediriger vers la page admin
              window.location.href = '../Administration/Admin';
            } else {
           //   window.location.href = '../actions/AjouterUser';
           window.location.href = '../Administration/Admin1';
              // Rediriger vers une autre page pour les utilisateurs non-admin
              // Ajoutez ici la logique de redirection pour les utilisateurs non-admin
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        swal('Erreur', 'Veuillez réessayer', 'error');
      });
  };

  const handleTogglePassword = () => {
    setPost((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };
  const [value, setValue] = React.useState(0);
  
  const currentYear = new Date().getFullYear();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


  const day = new Date().getDate();
  const month = new Date().toLocaleDateString('fr-FR', { month: 'long' });
  const year = new Date().getFullYear();
  const data = `${day} ${month} ${year}`;



  return (
    <ThemeProvider theme={defaultTheme}>
    <div className='wrapper1'>

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="absolute"  style={{ background :"transparent", marginBottom:"5px" }} elevation={1} >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        
        <img src={logo} style={{ height:"50px", width:"135px", marginTop:"20px"}}  alt="Logo" />
        </Typography>
        
        <div>
        <br/>
        <Button style={{ color:"orange", fontSize:"12px"}} >  {data} </Button>
      
      </div>
      </Toolbar>
    </AppBar>
  </Box>
<br/>
    
<br/><br/>
     
      <Container className='container' 
       component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
     
          <Typography  component="h1" variant="h5">
           <p style={{color:"black"}}>Connexion</p>
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 0 }}>
            <TextField
              margin="normal"
              required
              fullWidth
             
              label="Votre adresse e-mail"
              name="email"
              value={post.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField 
              margin="normal"
              required
              fullWidth
              type={post.showPassword ? 'text' : 'password'}
              value={post.password}
              onChange={handleChange}
              name="password"
              label="Mot de passe"
             
            
            
            />
            <IconButton
            style={{ float: 'left', marginTop: '-9px' }}
            className="password-toggle-button"
            onClick={handleTogglePassword}
          >
            {post.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          
            <Button style={{marginLeft:"auto",
            marginRight:"auto"
          
          }} onClick={handleClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: -1  }}
            >
              CONNEXION
            </Button>
        </Box>
        </Box>
        
        <Copyright sx={{ mt: 2, mb: 3 }} />
      </Container>
  
    <Box  style={{width:"100%"}} sx={{ pb: 1 }} >
           
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
     
    <span style={{ color: 'black',  marginTop :"10px" }}>
    <CopyrightIcon /> <b>{currentYear} </b>    <b style={{ color: 'orange' }}>IKABUS   </b> 
  </span> 
  
  <span style={{ marginLeft : "12px" , marginTop :"10px" }}  >      Tous  droits réservés.</span>
     
      </BottomNavigation>
     
    </Paper>
  </Box>
    

    </div>
    </ThemeProvider>
  );
}

export default Login