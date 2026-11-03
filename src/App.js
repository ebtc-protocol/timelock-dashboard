import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import useTimelockTransactions from './hooks/useTimelockTransactions';
import {
  GET_LOW_SEC_SCHEDULED_TRANSACTIONS,
  GET_HIGH_SEC_SCHEDULED_TRANSACTIONS,
  GET_LOW_SEC_EXECUTED_TRANSACTIONS,
  GET_HIGH_SEC_EXECUTED_TRANSACTIONS,
  GET_LOW_SEC_CANCELLED_TRANSACTIONS,
  GET_HIGH_SEC_CANCELLED_TRANSACTIONS,
  GET_LOW_SEC_SALTS,
  GET_HIGH_SEC_SALTS,
} from './queries';
import createEbtcTheme from './Theme';

// Components
import TransactionsTable from './components/TransactionsTable';
import NavigationBar from './components/NavigationBar';

const LOW_SEC_QUERIES = {
  scheduled: {
    query: GET_LOW_SEC_SCHEDULED_TRANSACTIONS,
    field: 'callScheduleds',
  },
  executed: {
    query: GET_LOW_SEC_EXECUTED_TRANSACTIONS,
    field: 'callExecuteds',
  },
  cancelled: { query: GET_LOW_SEC_CANCELLED_TRANSACTIONS, field: 'cancelleds' },
  salts: { query: GET_LOW_SEC_SALTS, field: 'callSalts' },
};

const HIGH_SEC_QUERIES = {
  scheduled: {
    query: GET_HIGH_SEC_SCHEDULED_TRANSACTIONS,
    field: 'highSecTimelockCallScheduleds',
  },
  executed: {
    query: GET_HIGH_SEC_EXECUTED_TRANSACTIONS,
    field: 'highSecTimelockCallExecuteds',
  },
  cancelled: {
    query: GET_HIGH_SEC_CANCELLED_TRANSACTIONS,
    field: 'highSecTimelockCancelleds',
  },
  salts: { query: GET_HIGH_SEC_SALTS, field: 'highSecTimelockCallSalts' },
};

function App() {
  const [chainId, setChainId] = useState('mainnet');
  const [mode, setMode] = useState('dark'); // Default to 'dark' mode

  // Function to toggle the theme
  const handleThemeChange = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  // Apply the dark or light mode based on state
  const theme = createEbtcTheme(mode);

  const lowSec = useTimelockTransactions(
    chainId,
    LOW_SEC_QUERIES,
    'LowSecTimelock_id'
  );
  const highSec = useTimelockTransactions(
    chainId,
    HIGH_SEC_QUERIES,
    'HighSecTimelock_id'
  );

  const renderContent = () => {
    if (lowSec.error || highSec.error) {
      const failed = lowSec.error ? 'LowSec' : 'HighSec';
      return (
        <p style={{ textAlign: 'center' }}>
          Error loading {failed} Timelock transactions on {chainId}. The data
          shown would be incomplete, so it has been hidden.
        </p>
      );
    }
    if (lowSec.loading || highSec.loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    return (
      <div>
        <TransactionsTable
          transactions={lowSec.transactions}
          timelockIdKey="LowSecTimelock_id"
          chain={chainId}
        />
        <TransactionsTable
          transactions={highSec.transactions}
          timelockIdKey="HighSecTimelock_id"
          chain={chainId}
        />
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar
        chainId={chainId}
        setChainId={setChainId}
        mode={mode}
        handleThemeChange={handleThemeChange}
      />
      {renderContent()}
    </ThemeProvider>
  );
}

export default App;
