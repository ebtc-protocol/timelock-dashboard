import React, { useState, useEffect } from 'react';
import { processTransactions } from './utils';
import TransactionsTable from './components/TransactionsTable';
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
import './styles.css';

const App = () => {
  const [lowSecTransactions, setLowSecTransactions] = useState([]);
  const [highSecTransactions, setHighSecTransactions] = useState([]);

  // Fetch data from The Graph for the Low Sec Timelock transactions
  const {
    data: lowSecScheduledData,
    loading: lowSecScheduledLoading,
    error: lowSecScheduledError
  } = useQuery(GET_LOW_SEC_SCHEDULED_TRANSACTIONS);
  
  const { data: lowSecExecutedData } = useQuery(GET_LOW_SEC_EXECUTED_TRANSACTIONS);
  const { data: lowSecCancelledData } = useQuery(GET_LOW_SEC_CANCELLED_TRANSACTIONS);
  const { data: lowSecSaltsData } = useQuery(GET_LOW_SEC_SALTS);

  // Fetch data from The Graph for the High Sec Timelock transactions
  const {
    data: highSecScheduledData,
    loading: highSecScheduledLoading,
    error: highSecScheduledError
  } = useQuery(GET_HIGH_SEC_SCHEDULED_TRANSACTIONS);
  const { data: highSecExecutedData } = useQuery(GET_HIGH_SEC_EXECUTED_TRANSACTIONS);
  const { data: highSecCancelledData } = useQuery(GET_HIGH_SEC_CANCELLED_TRANSACTIONS);
  const { data: highSecSaltsData } = useQuery(GET_HIGH_SEC_SALTS);

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
    <div>
      <h1>Low Security Timelock Transactions</h1>
      <TransactionsTable transactions={lowSecTransactions} timelockIdKey='LowSecTimelock_id' />

      <h1>High Security Timelock Transactions</h1>
      <TransactionsTable transactions={highSecTransactions} timelockIdKey='HighSecTimelock_id' />
    </div>
  );
};

export default App;
