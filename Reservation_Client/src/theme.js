import { createTheme } from '@mui/material/styles';
import App from './App';
const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '24px', // Taille de base pour les icônes
          '@media (max-width: 500px)': {
            fontSize: '18px', 
            color: 'orange'// Réduire la taille pour les écrans plus petits
          },
          /* Autres styles de responsivité */
        },
      },
    },
  },
});

export default theme;
