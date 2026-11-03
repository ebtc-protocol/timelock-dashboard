import { gql } from '@apollo/client';

export const GET_LOW_SEC_SCHEDULED_TRANSACTIONS = gql`
  query GetLowSecScheduledTransactions {
    callScheduleds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
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
    callExecuteds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
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
    callSalts(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      LowSecTimelock_id
      salt
      blockTimestamp
    }
  }
`;

export const GET_LOW_SEC_CANCELLED_TRANSACTIONS = gql`
  query GetLowSecCancelledTransactions {
    cancelleds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      LowSecTimelock_id
      blockTimestamp
    }
  }
`;

export const GET_HIGH_SEC_SCHEDULED_TRANSACTIONS = gql`
  query GetHighSecScheduledTransactions {
    highSecTimelockCallScheduleds(
      first: 1000
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
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
    highSecTimelockCallExecuteds(
      first: 1000
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
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
    highSecTimelockCallSalts(
      first: 1000
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      HighSecTimelock_id
      salt
      blockTimestamp
    }
  }
`;

export const GET_HIGH_SEC_CANCELLED_TRANSACTIONS = gql`
  query GetHighSecCancelledTransactions {
    highSecTimelockCancelleds(
      first: 1000
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      HighSecTimelock_id
      blockTimestamp
    }
  }
`;
