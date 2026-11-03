import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const subgraphUrl = (chain, override) =>
  override ||
  `https://api.studio.thegraph.com/query/67541/ebtc-${chain}-timelocks/version/latest`;

const createClient = (uri) =>
  new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });

// One client per chain, so each has its own endpoint and cache
const clients = {
  mainnet: createClient(
    subgraphUrl('mainnet', process.env.REACT_APP_SUBGRAPH_URL_MAINNET)
  ),
  sepolia: createClient(
    subgraphUrl('sepolia', process.env.REACT_APP_SUBGRAPH_URL_SEPOLIA)
  ),
};

export default clients;
