# eBTC Timelock Transparency Dashboard

## Description

The eBTC Timelock Transparency Dashboard is a web application designed to monitor and display transactions for the [eBTC Minimized Governance](https://forum.badger.finance/t/ebtc-minimized-governance-framework/6168) Timelocks and their state. It provides users with a real-time view of the state of transactions within the HighSec and LowSec Timelock contracts deployed on Sepolia and Ethereum Mainnet. By integrating with The Graph and Etherscan, the dashboard showcases transaction details such as ID, target, data, salt, timestamp, ETA, and the current state—scheduled, executed, or cancelled.

eBTC uses Open Zeppelin's TimelockController [contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/TimelockController.sol).

## Status

The eBTC protocol is deprecated and this dashboard is no longer maintained. The hosted site no longer loads data because the Graph Studio development endpoint it used is unavailable. To run it, publish the [subgraph](https://github.com/sajanrajdev/ebtc-mainnet-timelocks-subgraph) and set its URL as shown in `.env.example`.

## How It Works

Timelock events are indexed by a subgraph and read through GraphQL. For each scheduled operation, the app matches later execution, cancellation and salt events by operation id, decodes the calldata using the contract ABIs in `src/abis`, and maps role hashes to readable names. Each query returns at most the 1,000 most recent events.

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
git clone https://github.com/ebtc-protocol/timelock-dashboard.git
cd timelock-dashboard
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

4. **Run the Checks:**

```sh
npm run lint
npm run prettier
npm test -- --watchAll=false
npm run build
```

## Features

- **Decoded Transactions**: Shows target contract names, decoded function calls and readable role names.
- **Chain Selector**: Toggle between Sepolia and Mainnet to view transactions from different networks.
- **Transaction State Links**: Direct links to Etherscan for each transaction based on its state.
- **Progress Bar**: Displays the progress of the time window for a transaction to be executed.
- **Dark and Light Mode**: Users can switch between themes for comfort.
- **Copy to Clipboard**: Allows easy copying of the full transaction ID.
