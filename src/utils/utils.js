import { Interface } from 'ethers';
import contractNames from './contracts';

export const processTransactions = (
  scheduledTransactions,
  executedTransactions,
  cancelledTransactions,
  salts,
  idKey
) =>
  scheduledTransactions.map((scheduled) => {
    const executed = executedTransactions.find(
      (ex) => ex[idKey] === scheduled[idKey]
    );
    const cancelled = cancelledTransactions.find(
      (can) => can[idKey] === scheduled[idKey]
    );
    const saltEntity = salts.find((s) => s[idKey] === scheduled[idKey]) || {
      salt: '0x0',
    };

    const state = executed ? 'Executed' : cancelled ? 'Cancelled' : 'Scheduled';

    const salt =
      saltEntity && saltEntity.salt !== '0x0'
        ? parseInt(saltEntity.salt, 16).toString()
        : '-';

    const timestamp = Number(scheduled.blockTimestamp);
    const delayInSeconds = Number(scheduled.delay);
    const etaTimestamp = timestamp + delayInSeconds;
    const isValidDate = !isNaN(timestamp) && !isNaN(delayInSeconds);
    const etaDate = isValidDate ? new Date(etaTimestamp * 1000) : null;
    const timestampDate = isValidDate ? new Date(timestamp * 1000) : null;

    return {
      id: scheduled.id,
      [idKey]: scheduled[idKey],
      index: scheduled.index,
      target: scheduled.target,
      value: scheduled.value,
      data: scheduled.data,
      salt,
      timestamp: timestampDate
        ? timestampDate.toLocaleString()
        : 'Invalid Date',
      eta: etaDate ? etaDate.toLocaleString() : 'Invalid Date',
      state,
    };
  });

// A utility function to find the contract name by address on a specific chain
export const findContractNameByAddress = (address, chain) => {
  const contractsOnChain = contractNames[chain];
  for (const [name, contractAddress] of Object.entries(contractsOnChain)) {
    if (address.toLowerCase() === contractAddress.toLowerCase()) {
      return name;
    }
  }
  return null;
};

// The updated decoding function
export const decodeTransactionData = (data, target, chainId) => {
  try {
    const contractName = findContractNameByAddress(target, chainId);
    if (!contractName) {
      throw new Error(
        `Contract name for address ${target} not found on chain ${chainId}.`
      );
    }

    // Assuming ABIs are stored in `abis` folder with names matching the contract names in the mapping
    const abi = require(`./../abis/${contractName}.json`);
    const iface = new Interface(abi);
    const decoded = iface.parseTransaction({ data });

    return `${decoded.name}(${decoded.args.join(', ')})`;
  } catch (error) {
    console.error('Error decoding transaction data:', error);
    return 'Could not decode';
  }
};

// A utility function to get the Etherscan link for a specific address on a specific chain
export const getEtherscanAddressUrl = (address, chainId) => {
  const prefix =
    chainId === 'mainnet'
      ? 'https://etherscan.io/address/'
      : 'https://sepolia.etherscan.io/address/';
  return `${prefix}${address}`;
};

export const getEtherscanTxUrl = (id, chain) => {
  const txHash = id.slice(0, 66); // Extract the first 66 characters for the hash
  const etherscanBaseUrl =
    chain === 'mainnet'
      ? 'https://etherscan.io/tx/'
      : 'https://sepolia.etherscan.io/tx/';
  return etherscanBaseUrl + txHash;
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {},
    (err) => {
      console.error('Could not copy text: ', err);
    }
  );
};
