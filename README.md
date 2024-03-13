<div align="center" style="margin-bottom:15px">
  <img height=80 src="https://www.ebtc.finance/_next/image?url=%2Fassets%2Fmain-logo.png&w=640&q=75">
</div>

# eBTC Timelock Transparency Dashboard

## Description

The eBTC Timelock Transparency Dashboard is a web application designed to monitor and display transactions for the [eBTC Minimized Governance](https://forum.badger.finance/t/ebtc-minimized-governance-framework/6168) Timelocks and their state. It provides users with a real-time view of the state of transactions within the HighSec and LowSec Timelock contracts deployed on Sepolia and Ethereum Mainnet. By integrating with The Graph and Etherscan, the dashboard showcases transaction details such as ID, target, data, salt, timestamp, ETA, and the current state—scheduled, executed, or cancelled.

eBTC uses Open Zeppelin's TimelockController [contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/TimelockController.sol).

Learn [more](https://www.ebtc.finance/) about eBTC!

## Transaction Parameters

- **ID**: The unique internal identifier for each timelock transaction.
- **Target**: The contract where the transaction intends to execute an operation.
- **Data**: The function call and parameters to be executed by the timelock on the target in matter.
- **Salt**: An optional value that can be passed to a transaction in order to make it unique in case of a repeated target + data.
- **Timestamp**: The date and time at which the transaction was scheduled into timelock.
- **ETA**: The date and time at which a transaction will become or became executable (includes a progress bar to visualize the remaning time before execution is availble).
- **State**: Shows whether a transaction is currently scheduled, executed or cancelled.

## Installation

To set up the eBTC Timelock Transparency Dashboard locally, follow these instructions:

1. **Clone the Repository:**

```sh
git clone https://github.com/ebtc-finance/ebtc-timelock-dashboard.git
cd ebtc-timelock-dashboard
```

2. **Install Dependencies:**

Ensure you have Node.js and npm/yarn installed, then run:

```sh
npm install
# or
yarn install
```

3. **Start the Application:**

```sh
npm start
# or
yarn start
```

The application should now be running on `http://localhost:3000`.

## Features

- **Real-time Updates**: Dynamically fetches the latest transaction data from the blockchain.
- **Chain Selector**: Toggle between Sepolia and Mainnet to view transactions from different networks.
- **Transaction State Links**: Direct links to Etherscan for each transaction based on its state.
- **Progress Bar**: Displays the progress of the time window for a transaction to be executed.
- **Dark and Light Mode**: Users can switch between themes for comfort.
- **Copy to Clipboard**: Allows easy copying of the full transaction ID.