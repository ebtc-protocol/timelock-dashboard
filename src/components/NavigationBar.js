import React from 'react';
import { AppBar, Toolbar, Typography, FormControl, Select, MenuItem, Switch, FormGroup, FormControlLabel } from '@mui/material';

const NavigationBar = ({ chainId, setChainId, darkMode, handleThemeChange }) => {
  const handleChainChange = (event) => {
    setChainId(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          eBTC Timelock Transparency Dashboard
        </Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="chain-select-label"
            id="chain-select"
            value={chainId}
            onChange={handleChainChange}
            label="Chain"
            style={{ color: 'white', borderBottom: '1px solid white' }}
          >
            <MenuItem value={'mainnet'}>Mainnet</MenuItem>
            <MenuItem value={'sepolia'}>Sepolia</MenuItem>
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={handleThemeChange} />}
            label={darkMode ? '☀️' : '🌙'}
            labelPlacement="start"
            sx={{ color: 'white', marginLeft: 'auto' }}
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
