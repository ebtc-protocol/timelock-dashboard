import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://api.studio.thegraph.com/query/67541/ebtc-mainnet-timelocks/version/latest', // Default to Mainnet
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    uri: `https://api.studio.thegraph.com/query/67541/ebtc-${operation.getContext().chain}-timelocks/version/latest`
  });
  return forward(operation);
});

const link = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
