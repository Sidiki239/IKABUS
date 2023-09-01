import Axios from "axios"
import './AjouterRoutes.css'
import swal from 'sweetalert';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState , useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

function AjouterRoutes() {
  const navigate = useNavigate()
  const currentDate = new Date().toLocaleDateString();
  const [post, setPost] = useState({
    date1: '',
    departure: '',
    arrival: '',
    hour_departure: '',
    hour_arrival: '',
    price: '',
    places: '',
  });
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Récupérer le token depuis le localStorage
    const token = window.localStorage.getItem('token');

    // Vérifier que le token existe
    if (token) {
      // Envoyer une requête au backend pour récupérer les informations de l'utilisateur
      Axios
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
              }, 3000);
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

  const logout = () => {
    window.localStorage.clear();
    window.location.href = '../Administration/Login';
  };
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
    const { date1, departure, arrival, hour_departure, hour_arrival, price, places } = post;
    if (!date1 || !departure || !arrival || !hour_departure || !hour_arrival || !price || !places) {
      swal('Erreur', 'Veuillez remplir tous les champs', 'error');
      return;
    }

    const newTrajet = {
      date1: post.date1,
      departure: post.departure,
      arrival: post.arrival,
      hour_departure: post.hour_departure,
      hour_arrival: post.hour_arrival,
      price: post.price,
      places: post.places,
      compagnie: userInfo.compagnie
    };
    

    Axios.post('http://localhost:3002/insert', newTrajet)
      .then((res) => {
        console.log(res);
        swal('Parfait!', 'Nouveau trajet ajouté !!', 'success').then(() => {
          // Rediriger vers une autre page ou une autre route ici
          // Par exemple, pour rediriger vers la page d'accueil, vous pouvez utiliser :
          window.location.href = '../Administration/Admin';
        });
      })
      .catch((err) => {
        console.log(err);
        swal('Erreur', 'Une erreur est survenue lors de l\'ajout du trajet', 'error');
      });
  };

  return (
    <div className="form">
   <div className="container">
      <h3>Ajouter nouveau trajet</h3>
<br/>
      <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
      <Form.Label>Date</Form.Label>
      <Form.Control
        type="date"
        name="date1"
        value={post.date1}
        onChange={handleChange}
        defaultValue={currentDate}
      />
    </Form.Group>
    <div className="grid-container">
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Départ</Form.Label>
        <Form.Control
          type="text"  
          placeholder="DEPART"
          name="departure"
          value={post.departure}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Arrivée</Form.Label>
        <Form.Control
          type="text"
          placeholder="ARRIVEE"
          name="arrival"
          value={post.arrival}
          onChange={handleChange}
        />
      </Form.Group>
      
      <Form.Group controlId="formGroupPassword">
        <Form.Label>H.départ</Form.Label>
        <Form.Control
          type="time"
          placeholder="Heure de départ "
          name="hour_departure"
          value={post.hour_departure}
          onChange={handleChange}  />

      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>H.arrivée</Form.Label>
        <Form.Control
          type="time"
          placeholder="Heure d'arrivée"
          name="hour_arrival"
          value={post.hour_arrival}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Prix</Form.Label>
        <Form.Control
          type="number"
          placeholder="Prix(Fcfa)"
          name="price"
          value={post.price}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Places</Form.Label>
        <Form.Control
          type="number"
          placeholder="Places"
          name="places"
          value={post.places}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
    <div className="button-container">
      <Button
        style={{ color: 'white', background: 'orange', width:'43%', border:"0" }}
        onClick={handleClick} >
        <b>VALIDER</b>
      </Button>
      <Button onClick={() => navigate("../Administration/Admin")} style={{ color: 'white', background: 'red' , width:'43%', border:"0" }} >
        ANNULER
      </Button>
    </div>

      </Form>
    </div>
    </div>
   
  );
}

export default AjouterRoutes;
