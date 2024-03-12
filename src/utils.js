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
  