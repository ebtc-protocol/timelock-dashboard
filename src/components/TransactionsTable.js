import React from 'react';
import { decodeTransactionData, findContractNameByAddress, getEtherscanLink } from './../utils/utils';
import { contractNames } from './../utils/contracts';

const TransactionsTable = ({ transactions, timelockIdKey, chain}) => {
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
            <td>
                <a href={getEtherscanLink(tx.target, chain)} target="_blank" rel="noopener noreferrer">
                {findContractNameByAddress(tx.target, chain) || 'Unknown Contract'}
                </a>
            </td>
            <td>{decodeTransactionData(tx.data, tx.target, chain)}</td>
            <td>
              {tx.salt}
            </td>
            <td>{tx.timestamp}</td>
            <td>{tx.eta}</td>
            <td>{tx.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;