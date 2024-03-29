import { createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';

export const appColors = {
  background: '#f9f9fb',
  white: '#ffffff',
  primary: '#fb9500',
  secondary: '#54419e',
  chartProteinColor: '#fb9500',
  chartFatColor: '#FB1800',
  chartCarbohydratesColor: '#E4FB00',
  dangerous: '#FF0000',
  darkPrimary: '#FF8C00',
};

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
    h1: {
      fontSize: '96px',
    },
    h2: {
      fontSize: '72px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '54px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '36px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '24px',
      fontWeight: 700,
      color: appColors.secondary,
    },
    body1: {
      fontSize: '20px',
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '18.75px',
    },
    body2: {
      fontSize: '14px',
      lineHeight: '16.41px',
    },
    button: {
      fontSize: '16px',
      letterSpacing: '0.07em',
      lineHeight: '16.41px',
    },
    caption: {
      fontSize: '14px',
      lineHeight: '14.06px',
    },
  },
  palette: {
    background: {
      default: appColors.background,
    },
    primary: {
      main: appColors.primary,
      contrastText: appColors.white,
      dark: appColors.darkPrimary,
    },
    secondary: {
      main: appColors.secondary,
    },
  },
  appColors,
  appShadows: {
    greyShadow1: '0px 2px 15px 2px rgba(97, 105, 126, 0.1)',
    greyShadow2: '0px 2px 20px 2px rgba(97, 105, 126, 0.07)',
  },
}, ruRU);

export default theme;
