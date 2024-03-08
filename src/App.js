import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_SCHEDULED_TRANSACTIONS,
  GET_EXECUTED_TRANSACTIONS,
  GET_CANCELLED_TRANSACTIONS,
  GET_SALTS
} from './queries';
import './styles.css';

const delayInDays = 2; // This represents the 2-day hardcoded delay

const App = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch data from The Graph
  const {
    data: scheduledData,
    loading: scheduledLoading,
    error: scheduledError
  } = useQuery(GET_SCHEDULED_TRANSACTIONS);
  
  const { data: executedData } = useQuery(GET_EXECUTED_TRANSACTIONS);
  const { data: cancelledData } = useQuery(GET_CANCELLED_TRANSACTIONS);
  const { data: saltsData } = useQuery(GET_SALTS);

  // Process and combine data
  useEffect(() => {
    if (scheduledData && executedData && cancelledData && saltsData) {
      const processedTransactions = scheduledData.callScheduleds.map(scheduled => {
        const executed = executedData.callExecuteds.find(ex => ex.TimelockControllerEnumerable_id === scheduled.TimelockControllerEnumerable_id);
        const cancelled = cancelledData.cancelleds.find(can => can.TimelockControllerEnumerable_id === scheduled.TimelockControllerEnumerable_id);
        const salt = saltsData.callSalts.find(s => s.TimelockControllerEnumerable_id === scheduled.TimelockControllerEnumerable_id) || { salt: '0x0' };
        
        const state = executed
          ? 'Executed'
          : cancelled
          ? 'Cancelled'
          : 'Scheduled';
        
        // Convert blockTimestamp from String to Number and calculate ETA using the event's delay
        const timestamp = parseInt(scheduled.blockTimestamp);
        const delayInSeconds = parseInt(scheduled.delay); // Make sure to parse the delay to an integer
        const etaDate = new Date((timestamp + delayInSeconds) * 1000); // Use the delay from the event
        
        let eta = '';
        if (!isNaN(etaDate.getTime())) {
          eta = etaDate.toISOString();
        } else {
          console.error('Invalid blockTimestamp or delay:', scheduled.blockTimestamp, scheduled.delay);
        }
        
        return {
          ...scheduled,
          state,
          salt: salt.salt,
          eta // this will be an empty string if the date is invalid
        };
      });
      

      setTransactions(processedTransactions);
    }
  }, [scheduledData, executedData, cancelledData, saltsData]);

  if (scheduledLoading) return <p>Loading...</p>;
  if (scheduledError) return <p>Error loading transactions</p>;

  // Render your table with the transactions data
  return (
    <div>
      <h1>Timelock Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Target</th>
            <th>Data</th>
            <th>Salt</th>
            <th>Timestamp</th>
            <th>ETA</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td title={tx.TimelockControllerEnumerable_id}>
                {`${tx.TimelockControllerEnumerable_id.substring(0, 6)}...${tx.TimelockControllerEnumerable_id.substring(tx.TimelockControllerEnumerable_id.length - 4)}`}
              </td>
              <td>{tx.target}</td>
              <td>{tx.data}</td>
              <td>
                {tx.salt ? parseInt(tx.salt, 16).toString() : '-'}
              </td>
              <td>{new Date(tx.blockTimestamp * 1000).toLocaleString()}</td>
              <td>{tx.eta}</td>
              <td>{tx.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
