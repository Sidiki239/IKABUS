import './AjouterUser.css';
import Axios from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import App from '../App';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';



function AjouterUser() {

  const navigate = useNavigate()
  const [post, setPost] = useState({
    nom: '',
    prenom: '',
    compagnie: '',
    email: '',
    type: '',
    numero_telephone: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (event) => {
    event.preventDefault();

    // Vérifier que tous les champs sont remplis
    const { nom, prenom, compagnie, email, type , numero_telephone, password } = post;
    if (!nom || !prenom || !compagnie || !email || !type || !numero_telephone || !password) {
      swal('Erreur', 'Veuillez remplir tous les champs', 'error');
      return;
    }

    // Vérifier le format de l'email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!email.match(emailRegex)) {
      swal('Erreur', 'Veuillez saisir une adresse e-mail valide', 'error');
      return;
    }

    // Vérifier le format du numéro de téléphone
    const phoneRegex = /^[0-9]{10}$/;
    if (!numero_telephone.match(phoneRegex)) {
      swal('Erreur', 'Veuillez saisir un numéro de téléphone valide (10 chiffres)', 'error');
      return;
    }

    const newUser = {
      nom: post.nom,
      prenom: post.prenom,
      compagnie: post.compagnie,
      email: post.email,
      type: post.type,
      numero_telephone: post.numero_telephone,
      password: post.password,
    };

    Axios.post('http://localhost:3002/register', newUser)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          swal('Erreur', 'Utilisateur déjà existant', 'info');
        } else {
          swal('Parfait!', 'Nouvel utilisateur ajouté !!', 'success').then(() => {
            // Rediriger vers une autre page ou une autre route ici
            // Par exemple, pour rediriger vers la page d'accueil, vous pouvez utiliser :
            window.location.href = '../Administration/Admin';
          });
        }
      })
      .catch((err) => {
        console.log(err);
        swal('Erreur', "Une erreur est survenue lors de l'ajout de l'utilisateur", 'error');
      });
  };

  const handleTogglePassword = () => {
    setPost((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  return (
    
   
   <div >
      <div className="center">
        <h4>Ajouter un utilisateur</h4>
      
        <form method="post">
          <div className="txt_field">
            <input
              type="text"
              name="nom"
              value={post.nom}
              onChange={handleChange}
              required
            />
            <span></span>
            <label>
              <b>
                {' '}
                <PersonIcon /> Nom
              </b>
            </label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              name="prenom"
              value={post.prenom}
              onChange={handleChange}
              required
            />
            <span></span>
            <label>
              <b>
                {' '}
                <PersonIcon /> Prénom
              </b>
            </label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              name="compagnie"
              value={post.compagnie}
              onChange={handleChange}
              required
            />
            <span></span>
            <label>
              <b>
                {' '}
                <DirectionsBusIcon /> Compagnie
              </b>
            </label>
          </div>
          <div className="txt_field">
            <input
              type="email"
              name="email"
              value={post.email}
              onChange={handleChange}
              required
            />
            <span></span>
            <label>
              <b>
                {' '}
                <EmailIcon /> E-mail
              </b>
            </label>
          </div>
          <div className="txt_field">
          <input
            type="text"
            name="type"
            value={post.type}
            onChange={handleChange}
            required
          />
          <span></span>
          <label>
            <b>
              {' '}
              <PhoneIcon /> Type
            </b>
          </label>
        </div>
          <div className="txt_field">
            <input
              type="text"
              name="numero_telephone"
              value={post.numero_telephone}
              onChange={handleChange}
              required
            />
            <span></span>
            <label>
              <b>
                {' '}
                <PhoneIcon /> Numéro de téléphone
              </b>
            </label>
          </div>
          <div className="txt_field">
            <input
              type={post.showPassword ? 'text' : 'password'}
              value={post.password}
              onChange={handleChange}
              name="password"
              required
            />
            <span></span>
            <label>
              <b>
                <LockIcon /> Mot de passe
              </b>
            </label>
          </div>
          <IconButton
            style={{ float: 'left', marginTop: '-25px' }}
            className="password-toggle-button"
            onClick={handleTogglePassword}
          >
            {post.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          <br /> 
          <Button className="submit" type="submit" onClick={handleClick}>
            AJOUTER
          </Button>
          <div className="signup_link">
            <a style={{ color: 'orange'}} onClick={()=> navigate("../Administration/Admin")}>RETOUR</a>
          </div>
        </form>
      </div>
      </div>
  
  );
}

export default AjouterUser;





