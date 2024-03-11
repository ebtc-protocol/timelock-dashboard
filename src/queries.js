import { gql } from '@apollo/client';

export const GET_LOW_SEC_SCHEDULED_TRANSACTIONS = gql`
  query GetLowSecScheduledTransactions {
    callScheduleds {
      id
      LowSecTimelock_id
      index
      target
      value
      data
      delay
      blockTimestamp
    }
  }
`;

export const GET_LOW_SEC_EXECUTED_TRANSACTIONS = gql`
  query GetLowSecExecutedTransactions {
    callExecuteds {
      id
      LowSecTimelock_id
      index
      target
      value
      data
      blockTimestamp
    }
  }
`;

export const GET_LOW_SEC_SALTS = gql`
  query GetLowSecSalts {
    callSalts {
      id
      LowSecTimelock_id
      salt
      blockTimestamp
    }
  }
`;

export const GET_LOW_SEC_CANCELLED_TRANSACTIONS = gql`
  query GetLowSecCancelledTransactions {
    cancelleds {
      id
      LowSecTimelock_id
      blockTimestamp
    }
  }
`;

export const GET_HIGH_SEC_SCHEDULED_TRANSACTIONS = gql`
  query GetHighSecScheduledTransactions {
    highSecTimelockCallScheduleds {
      id
      HighSecTimelock_id
      index
      target
      value
      data
      delay
      blockTimestamp
    }
  }
`;

export const GET_HIGH_SEC_EXECUTED_TRANSACTIONS = gql`
  query GetHighSecExecutedTransactions {
    highSecTimelockCallExecuteds {
      id
      HighSecTimelock_id
      index
      target
      value
      data
      blockTimestamp
    }
  }
`;

export const GET_HIGH_SEC_SALTS = gql`
  query GetHighSecSalts {
    highSecTimelockCallSalts {
      id
      HighSecTimelock_id
      salt
      blockTimestamp
    }
  }
`;

export const GET_HIGH_SEC_CANCELLED_TRANSACTIONS = gql`
  query GetHighSecCancelledTransactions {
    highSecTimelockCancelleds {
      id
      HighSecTimelock_id
      blockTimestamp
    }
  }
`;
