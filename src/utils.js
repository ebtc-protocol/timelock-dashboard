export const processTransactions = (
    scheduledTransactions,
    executedTransactions,
    cancelledTransactions,
    salts,
    idKey
  ) => {
    const delayInDays = 2; // This represents the 2-day hardcoded delay
  
    return scheduledTransactions.map(scheduled => {
      const executed = executedTransactions.find(ex => ex[idKey] === scheduled[idKey]);
      const cancelled = cancelledTransactions.find(can => can[idKey] === scheduled[idKey]);
      const saltEntity = salts.find(s => s[idKey] === scheduled[idKey]);
      
      const state = executed
        ? 'Executed'
        : cancelled
        ? 'Cancelled'
        : 'Scheduled';
  
      // If salt is not present, use '0x0', otherwise convert hex to decimal
      const salt = saltEntity ? parseInt(saltEntity.salt, 16).toString() : '-';
  
      // Convert blockTimestamp from String to Number and calculate ETA using the event's delay
      const timestamp = parseInt(scheduled.blockTimestamp);
      const delayInSeconds = parseInt(scheduled.delay);
      const etaTimestamp = timestamp + delayInSeconds + (delayInDays * 24 * 60 * 60);
      const etaDate = new Date(etaTimestamp * 1000);
  
      let eta = '';
      if (!isNaN(etaDate.getTime())) {
        eta = etaDate.toLocaleString();
      } else {
        console.error('Invalid blockTimestamp or delay:', scheduled.blockTimestamp, scheduled.delay);
      }
  
      return {
        id: scheduled.id,
        [idKey]: scheduled[idKey], // dynamic key based on idKey argument
        index: scheduled.index,
        target: scheduled.target,
        value: scheduled.value,
        data: scheduled.data,
        salt: salt,
        timestamp: new Date(timestamp * 1000).toLocaleString(),
        eta: eta,
        state: state
      };
    });
  };
  