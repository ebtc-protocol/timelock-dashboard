import { Interface } from 'ethers';
import contractNames from './contracts';
import roleMapping from './timelockRoles';

// Events for an operation id only count if they happened at or after this
// schedule: OpenZeppelin's TimelockController lets a cancelled id be rescheduled.
const findEventSince = (events, idKey, id, since) =>
  events.find(
    (event) => event[idKey] === id && Number(event.blockTimestamp) >= since
  );

export const processTransactions = (
  scheduledTransactions,
  executedTransactions,
  cancelledTransactions,
  salts,
  idKey
) =>
  scheduledTransactions.map((scheduled) => {
    const timestamp = Number(scheduled.blockTimestamp);
    const delayInSeconds = Number(scheduled.delay);
    const executed = findEventSince(
      executedTransactions,
      idKey,
      scheduled[idKey],
      timestamp
    );
    const cancelled = findEventSince(
      cancelledTransactions,
      idKey,
      scheduled[idKey],
      timestamp
    );
    const saltEntity = salts.find((s) => s[idKey] === scheduled[idKey]) || {
      salt: '0x0',
    };

    const state = executed ? 'Executed' : cancelled ? 'Cancelled' : 'Scheduled';

    const salt =
      saltEntity && saltEntity.salt !== '0x0'
        ? BigInt(saltEntity.salt).toString()
        : '-';

    const etaTimestamp = timestamp + delayInSeconds;
    const isValidDate =
      !Number.isNaN(timestamp) && !Number.isNaN(delayInSeconds);
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
      timestampMs: timestampDate ? timestampDate.getTime() : null,
      etaMs: etaDate ? etaDate.getTime() : null,
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

// Decodes timelock calldata into a readable function call
export const decodeTransactionData = (data, target, chainId) => {
  try {
    let contractName = findContractNameByAddress(target, chainId);
    if (!contractName) {
      throw new Error(
        `Contract name for address ${target} not found on chain ${chainId}.`
      );
    }

    // If contract name includes _old, remove it (Sepolia has two sets of contracts)
    contractName = contractName.replace('_old', '');

    // Assuming ABIs are stored in `abis` folder with names matching the contract names in the mapping
    const abi = require(`./../abis/${contractName}.json`);
    const iface = new Interface(abi);
    const decoded = iface.parseTransaction({ data });
    let decodedDescription = '';

    if (['revokeRole', 'grantRole', 'renounceRole'].includes(decoded.name)) {
      const roleHash = decoded.args[0];
      const readableRole =
        roleMapping[roleHash.toLowerCase()] || 'UNKNOWN_ROLE';
      const modifiedArgs = [readableRole, ...decoded.args.slice(1)];

      // Rebuild the human-readable transaction description
      decodedDescription = `${decoded.name}(${modifiedArgs.join(', ')})`;
    } else {
      decodedDescription = decoded.name + '(' + decoded.args.join(', ') + ')';
    }
    return {
      decodedData: decodedDescription,
      rawData: data,
    };
  } catch (error) {
    console.error('Error decoding transaction data:', error);
    const decodedDescription = 'Could not decode';
    return {
      decodedData: decodedDescription,
      rawData: data,
    };
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
