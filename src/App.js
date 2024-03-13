import React, { useState, useEffect } from 'react';
import { processTransactions } from './utils/utils';
import { useQuery } from '@apollo/client';
import {
  GET_LOW_SEC_SCHEDULED_TRANSACTIONS,
  GET_HIGH_SEC_SCHEDULED_TRANSACTIONS,
  GET_LOW_SEC_EXECUTED_TRANSACTIONS,
  GET_HIGH_SEC_EXECUTED_TRANSACTIONS,
  GET_LOW_SEC_CANCELLED_TRANSACTIONS,
  GET_HIGH_SEC_CANCELLED_TRANSACTIONS,
  GET_LOW_SEC_SALTS,
  GET_HIGH_SEC_SALTS
} from './queries';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import createEbtcTheme from './Theme';

// Components
import TransactionsTable from './components/TransactionsTable';
import NavigationBar from './components/NavigationBar';

const App = () => {
  const [chainId, setChainId] = useState('mainnet');
  const [mode, setMode] = useState('dark'); // Default to 'dark' mode

  // Function to toggle the theme
  const handleThemeChange = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  // Apply the dark or light mode based on state
  const theme = createEbtcTheme(mode);

  // State to store the transactions
  const [lowSecTransactions, setLowSecTransactions] = useState([]);
  const [highSecTransactions, setHighSecTransactions] = useState([]);

  // Fetch data from The Graph for the Low Sec Timelock transactions
  const {
    data: lowSecScheduledData,
    loading: lowSecScheduledLoading,
    error: lowSecScheduledError
  } = useQuery(GET_LOW_SEC_SCHEDULED_TRANSACTIONS, {context: {chain: chainId},});
  
  const { data: lowSecExecutedData } = useQuery(GET_LOW_SEC_EXECUTED_TRANSACTIONS, {context: {chain: chainId},});
  const { data: lowSecCancelledData } = useQuery(GET_LOW_SEC_CANCELLED_TRANSACTIONS, {context: {chain: chainId},});
  const { data: lowSecSaltsData } = useQuery(GET_LOW_SEC_SALTS, {context: {chain: chainId},});

  // Fetch data from The Graph for the High Sec Timelock transactions
  const {
    data: highSecScheduledData,
    loading: highSecScheduledLoading,
    error: highSecScheduledError
  } = useQuery(GET_HIGH_SEC_SCHEDULED_TRANSACTIONS, {context: {chain: chainId},});
  const { data: highSecExecutedData } = useQuery(GET_HIGH_SEC_EXECUTED_TRANSACTIONS, {context: {chain: chainId},});
  const { data: highSecCancelledData } = useQuery(GET_HIGH_SEC_CANCELLED_TRANSACTIONS, {context: {chain: chainId},});
  const { data: highSecSaltsData } = useQuery(GET_HIGH_SEC_SALTS, {context: {chain: chainId},});

  // Process and combine data
  useEffect(() => {
    if (lowSecScheduledData && lowSecExecutedData && lowSecCancelledData && lowSecSaltsData) {
      setLowSecTransactions(processTransactions(
        lowSecScheduledData.callScheduleds,
        lowSecExecutedData.callExecuteds,
        lowSecCancelledData.cancelleds,
        lowSecSaltsData.callSalts,
        'LowSecTimelock_id'
      ));
    }

    if (highSecScheduledData && highSecExecutedData && highSecCancelledData && highSecSaltsData) {
      setHighSecTransactions(processTransactions(
        highSecScheduledData.highSecTimelockCallScheduleds,
        highSecExecutedData.highSecTimelockCallExecuteds,
        highSecCancelledData.highSecTimelockCancelleds,
        highSecSaltsData.highSecTimelockCallSalts,
        'HighSecTimelock_id'
      ));
    }
  }, [
    lowSecScheduledData,
    lowSecExecutedData,
    lowSecCancelledData,
    lowSecSaltsData,
    highSecScheduledData,
    highSecExecutedData,
    highSecCancelledData,
    highSecSaltsData
  ]);

  if (lowSecScheduledLoading || highSecScheduledLoading) return <p>Loading...</p>;
  if (lowSecScheduledError) return <p>Error loading LowSec Timelock transactions</p>;
  if (highSecScheduledError) return <p>Error loading HighSec Timelock transactions</p>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <NavigationBar
        chainId={chainId}
        setChainId={setChainId}
        mode={mode}
        handleThemeChange={handleThemeChange}
      />
      <div>
        <TransactionsTable transactions={lowSecTransactions} timelockIdKey='LowSecTimelock_id' chain={chainId}/>
        <TransactionsTable transactions={highSecTransactions} timelockIdKey='HighSecTimelock_id' chain={chainId}/>
      </div>
    </ThemeProvider>
  );
};

export default App;
