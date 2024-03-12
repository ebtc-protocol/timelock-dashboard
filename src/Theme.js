// theme.js
import { createTheme } from '@mui/material/styles';

// Define the eBTC theme colors and fonts
const ebtcTheme = createTheme({
  palette: {
    mode: 'dark', // Set the default mode to dark
    primary: {
      main: '#c247fc', // eBTC primary color
    },
    secondary: {
      main: '#c247fc', // eBTC secondary color
    },
    background: {
      default: '#190a21', // eBTC background color for dark mode
      paper: '#190a21',
    },
    text: {
      primary: '#fff',
      secondary: '#aaa',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Replace with the eBTC website's font if different
  },
  components: {
    // Customizing MUI components globally
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#fff', // Text color for tables
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#e30061', // Primary color for links
        },
      },
    },
    // Add more component customizations as needed
  },
});

export default ebtcTheme;
