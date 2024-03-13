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
    fontFamily: 'Inconsolata, monospace',
    fontWeightBold: 800,
    allVariants: {
      fontWeight: 800,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#010012' : '#9e29d3', // Use the mode to determine the color
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#fff' : '#000',
          borderColor: mode === 'dark' ? '#680ca5' : '#000',
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
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#010012' : '#fff',
          borderColor: mode === 'dark' ? '#680ca5' : '#000',
          borderCollapse: 'separate',
          borderSpacing: '0',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '20px',
        },
      },
    },
  },
});

const createEbtcTheme = (mode) => createTheme(getDesignTokens(mode));

export default createEbtcTheme;
