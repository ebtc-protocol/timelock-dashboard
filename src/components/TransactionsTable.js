import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Link, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { decodeTransactionData, findContractNameByAddress, getEtherscanLink, copyToClipboard } from '../utils/utils';

const TransactionsTable = ({ transactions, timelockIdKey, chain }) => {
  return (
    <>
        <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 2, fontWeight: 400, paddingLeft: 2  }}>
        {timelockIdKey.includes('LowSec') ? 'LowSec Timelock Transactions' : 'HighSec Timelock Transactions'}
        </Typography>
        <TableContainer component={Paper} sx={{ mx: 'auto', maxWidth: 'calc(100% - 32px)', mb: 4 }}>
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
                    <TableCell component="th" scope="row">
                        <Tooltip title={tx[timelockIdKey]}>
                        <span>
                            {`${tx[timelockIdKey].substring(0, 6)}...${tx[timelockIdKey].substring(tx[timelockIdKey].length - 4)}`}
                            <IconButton
                            onClick={() => copyToClipboard(tx[timelockIdKey])}
                            size="small"
                            sx={{ ml: 1 }}
                            >
                            <ContentCopyIcon fontSize="inherit" />
                            </IconButton>
                        </span>
                        </Tooltip>
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
    </>
  );
};

export default TransactionsTable;
