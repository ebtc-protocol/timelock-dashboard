import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  InputLabel,
} from '@mui/material';
import logo from '../assets/ebtc-main-logo.webp';

function NavigationBar({ chainId, setChainId, mode, handleThemeChange }) {
  const handleChainChange = (event) => {
    setChainId(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={logo}
          alt="eBTC Logo"
          style={{ maxHeight: '48px', marginRight: '16px' }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Timelock Transparency Dashboard
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="chain-select-label">Chain</InputLabel>
          <Select
            labelId="chain-select-label"
            id="chain-select"
            value={chainId}
            label="Chain"
            onChange={handleChainChange}
          >
            <MenuItem value="mainnet">Mainnet</MenuItem>
            <MenuItem value="sepolia">Sepolia</MenuItem>
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={mode === 'dark'} onChange={handleThemeChange} />
            }
            label={mode === 'dark' ? '☀️' : '🌙'}
            labelPlacement="start"
            sx={{ color: 'white', marginLeft: 'auto' }}
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
