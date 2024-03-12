import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#c247fc' : '#9e29d3',
    },
    secondary: {
      main: '#c247fc',
    },
    background: {
      default: mode === 'dark' ? '#190a21' : '#ffffff',
      paper: mode === 'dark' ? '#190a21' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#fff' : '#000',
      secondary: mode === 'dark' ? '#aaa' : '#555',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#fff' : '#000',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#e30061' : '#6200ea',
        },
      },
    },
  },
});

const createEbtcTheme = (mode) => createTheme(getDesignTokens(mode));

export default createEbtcTheme;
