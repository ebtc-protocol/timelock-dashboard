import React from 'react';

const TransactionsTable = ({ transactions, timelockIdKey }) => {
  return (
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
            <td title={tx[timelockIdKey]}>
              {`${tx[timelockIdKey].substring(0, 6)}...${tx[timelockIdKey].substring(tx[timelockIdKey].length - 4)}`}
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
  );
};

export default TransactionsTable;