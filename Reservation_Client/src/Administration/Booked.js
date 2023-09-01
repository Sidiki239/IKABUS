import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import './Booked.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from "axios"
import PersonIcon from '@mui/icons-material/Person';
import swal from 'sweetalert';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.lavender,
    color: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      padding: 2,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 9,
    padding: 2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      padding: 4,
    },
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

export function Booked() {
  const [trajets, setTrajets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

 
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



  useEffect(() => {
    const fetchTrajets = async () => {
      if (!userInfo) {
        // Return early if userInfo is null or undefined
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3002/getreservation/${userInfo.compagnie}`);
        const data = await response.json();
        setTrajets(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log('Erreur lors de la récupération des trajets:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchTrajets();
  }, [userInfo]); // Include userInfo as a dependency to re-fetch when it changes

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Add conditional check to handle empty or undefined data
  const paginatedData = trajets.slice
    ? trajets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <div className="table1">
      <h4>Total des Réservations</h4>
      <br />

      {loading ? (
        <div style={{color:"white"}}>Chargement...</div> // Show a loading message or spinner while data is being fetched
      ) : (

      <TableContainer  component={Paper}>
        <Table sx={{ maxWidth: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"><PersonIcon style={{fontSize:"16px"}}/> Passagers </StyledTableCell>
              <StyledTableCell align="center"><PlaceIcon style={{fontSize:"16px"}}/> Route</StyledTableCell>
              <StyledTableCell align="center"><CalendarTodayIcon style={{fontSize:"16px"}}/> Date </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((trajets) => {
              const { _id, nom, prenom,
                 departure,arrival,
                 hour_departure, 
                 hour_arrival,date2,
                  nombre_personnes } = trajets;

              return (
                <StyledTableRow key={_id} hover>
                  <StyledTableCell component="th" scope="row" align="center">
                    <span style={{fontSize:"10px"}}>{nom} {prenom} <br/>(<b style={{color:"Red"}}>{nombre_personnes}</b> Pers.)  </span>       <br />
            
                  </StyledTableCell>
                  <StyledTableCell  align="center"><span style={{fontSize:"10px"}}>{departure}-{arrival}</span><br />
                  <span style={{fontSize:"11px"}}> <b>{ hour_departure} -{hour_arrival}</b> </span></StyledTableCell>
                   <StyledTableCell align="center">
                   <span style={{fontSize:"10px", color:"red"}} ><b>{date2}</b></span>
                 </StyledTableCell>
                 
                 
                   </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      
        <TablePagination
          style={{ width: '100%', background: 'none', color: 'black', margin: 'auto' }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trajets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </TableContainer>
      )}
    </div>
  );
}

export default Booked;
