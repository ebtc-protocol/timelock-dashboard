import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import { decodeTransactionData, findContractNameByAddress, getEtherscanLink } from '../utils/utils';

const TransactionsTable = ({ transactions, timelockIdKey, chain }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Target</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Salt</TableCell>
            <TableCell align="right">Timestamp</TableCell>
            <TableCell align="right">ETA</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(tx => (
            <TableRow key={tx.id} hover>
              <TableCell component="th" scope="row" title={tx[timelockIdKey]}>
                {`${tx[timelockIdKey].substring(0, 6)}...${tx[timelockIdKey].substring(tx[timelockIdKey].length - 4)}`}
              </TableCell>
              <TableCell align="right">
                <Link href={getEtherscanLink(tx.target, chain)} target="_blank" rel="noopener noreferrer" color="inherit">
                  {findContractNameByAddress(tx.target, chain) || 'Unknown Contract'}
                </Link>
              </TableCell>
              <TableCell align="right">{decodeTransactionData(tx.data, tx.target, chain)}</TableCell>
              <TableCell align="right">{tx.salt}</TableCell>
              <TableCell align="right">{tx.timestamp}</TableCell>
              <TableCell align="right">{tx.eta}</TableCell>
              <TableCell align="right">{tx.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
