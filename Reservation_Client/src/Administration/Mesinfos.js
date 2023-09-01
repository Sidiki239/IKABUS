import EditIcon from '@mui/icons-material/Edit';
import './Mesinfos.css'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import App from '../App';
import Modal from '@mui/material/Modal';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { useEffect } from 'react';
import { Padding, Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Copyright(props) {
  const navigate = useNavigate()
}

const defaultTheme = createTheme();

function Mesinfos() {
  const [selectedUser , setSelectedUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modified, setModified] = useState({
    nom: "",
    prenom: "",
    email: "",
    compagnie: ""
  });

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
            } else {
              // Set default values for the modified state
              setModified({
                nom: res.data.data.nom,
                prenom: res.data.data.prenom,
                email: res.data.data.email,
                compagnie: res.data.data.compagnie
              });
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

  function handleChange(event) {
    setModified((prevModified) => ({
      ...prevModified,
      [event.target.name]: event.target.value
    }));
  }
  const handleEditClick =() =>  {
    
    setIsModalOpen(true);
   
  }
 

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    // Ici, vous pouvez envoyer les modifications au backend si nécessaire
    // Par exemple :
    // axios.post('http://localhost:3002/updateuserinfo', {
    //   name: modified.nom,
    //   company: modified.compagnie,
    //   token: window.localStorage.getItem('token'),
    // })
    //   .then((res) => {
    //     // Gérer la réponse du backend
    //   })
    //   .catch((error) => {
    //     // Gérer les erreurs
    //   });

    // Pour l'exemple, affichons simplement les valeurs modifiées dans une alerte
    swal('Modifications enregistrées !', `Nom: ${modified.nom}, Compagnie: ${modified.compagnie}`, 'success');
    setIsModalOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container className='container' component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h3" variant="h5">
              <span style={{ textAlign: "center", fontSize: "18px" }}><b>Informations du compte</b></span><br /><br />
              <p style={{ fontSize: "15px" }}> <DirectionsBusIcon /> Compagnie : {userInfo && userInfo.compagnie}</p>
              <main style={{ borderRadius: "10px", fontSize: "15px", textAlign: "left", width: "100%" }}>
                <p > <AccountCircleIcon /> {userInfo && userInfo.prenom}  {userInfo && userInfo.nom} (Admin) </p>
                <p > <EmailIcon /> {userInfo && userInfo.email}  </p>
              </main>
             {/* <Button style={{ textAlign: "center", color: "orange" }} onClick={handleEditClick}> <EditIcon /><b>Modifier mes infos</b></Button>*/}
            </Typography>
          </Box>
        {/*  <Modal open={isModalOpen} onClose={handleModalClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
              <Typography variant="h6">Modifier mes informations</Typography>
              <TextField
              label="Nom"
              name="nom"
              value={modified.nom}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={modified.prenom}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={modified.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Compagnie"
              name="compagnie"
              value={modified.compagnie}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>Enregistrer</Button>
            </div> 
  </Modal> */}
          <Copyright sx={{ mt: 3, mb: 3 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
export default Mesinfos;
