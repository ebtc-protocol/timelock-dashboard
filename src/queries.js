// queries.js
import { gql } from '@apollo/client';

export const GET_SCHEDULED_TRANSACTIONS = gql`
  query GetScheduledTransactions {
    callScheduleds {
      id
      TimelockControllerEnumerable_id
      index
      target
      data
      delay
      blockTimestamp
    }
  }
`;

export const GET_EXECUTED_TRANSACTIONS = gql`
  query GetExecutedTransactions {
    callExecuteds {
      TimelockControllerEnumerable_id
      blockTimestamp
    }
  }
`;

export const GET_CANCELLED_TRANSACTIONS = gql`
  query GetCancelledTransactions {
    cancelleds {
      TimelockControllerEnumerable_id
      blockTimestamp
    }
  }
`;

export const GET_SALTS = gql`
  query GetSalts {
    callSalts {
      TimelockControllerEnumerable_id
      salt
    }
  }
`;
