import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import clients from './apolloClient';
import App from './App';

ReactDOM.render(
  <ApolloProvider client={clients.mainnet}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
