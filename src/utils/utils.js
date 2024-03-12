import { Interface } from 'ethers';
import contractNames from './contracts';

export const processTransactions = (
    scheduledTransactions,
    executedTransactions,
    cancelledTransactions,
    salts,
    idKey
  ) => {
    return scheduledTransactions.map(scheduled => {
      const executed = executedTransactions.find(ex => ex[idKey] === scheduled[idKey]);
      const cancelled = cancelledTransactions.find(can => can[idKey] === scheduled[idKey]);
      const saltEntity = salts.find(s => s[idKey] === scheduled[idKey]) || { salt: '0x0' };
  
      const state = executed
        ? 'Executed'
        : cancelled
        ? 'Cancelled'
        : 'Scheduled';
  
      const salt = saltEntity && saltEntity.salt !== '0x0' ? parseInt(saltEntity.salt, 16).toString() : '-';
  
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
        salt: salt,
        timestamp: timestampDate ? timestampDate.toLocaleString() : 'Invalid Date',
        eta: etaDate ? etaDate.toLocaleString() : 'Invalid Date',
        state: state
      };
    });
  };
  
  // A utility function to find the contract name by address on a specific chain
  const findContractNameByAddress = (address, chain) => {
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
    console.log(findContractNameByAddress(target, chainId))
    try {
      const contractName = findContractNameByAddress(target, chainId);
      if (!contractName) {
        throw new Error(`Contract name for address ${target} not found on chain ${chainId}.`);
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
  