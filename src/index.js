import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
import App from './App';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/67541/ebtc-sepolia-timelocks/version/latest',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
