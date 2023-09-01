import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Admin from './Administration/Admin';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reserver from './reservation/Reserver';
import Booking from './Administration/Booking';
import Booked from './Administration/Booked';
import AjouterRoutes from './actions/AjouterRoutes';
import Login from './Administration/Login';
import AjouterUser from './actions/AjouterUser';
import Trajets_Trouves from './reservation/Trajets_trouves';
import Mesinfos from './Administration/Mesinfos';


const isLoggedIn = window.localStorage.getItem("loggedIn");


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Reservation/Reserver" element={<Reserver />} />
        <Route path="/Administration/Admin" element={isLoggedIn === "true" ? <Admin /> : <Login />} />
        <Route path="/Administration/Booking" element={isLoggedIn === "true" ? <Booking /> : <Login />} />
        <Route path="/Administration/Booked" element={ isLoggedIn === "true" ? <Booked /> : <Login /> } />
        <Route path="/Administration/Login" element={<Login />} />

        <Route path="/actions/AjouterRoutes" element={isLoggedIn === "true" ?<AjouterRoutes /> : <Login />} />
        <Route path="/actions/AjouterUser" element={isLoggedIn === "true" ? <AjouterUser /> : <Login /> } />
        <Route path="/reservation/Trajets_trouves" element={<Trajets_Trouves />} />
        <Route path="/Administration/Mesinfos" element={isLoggedIn === "true" ? <Mesinfos /> : <Login />} />
        
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
