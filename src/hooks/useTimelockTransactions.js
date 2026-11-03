import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import clients from '../apolloClient';
import { processTransactions } from '../utils/utils';

// Loads the four event types for one timelock and combines them into rows.
// `queries` maps each event type to its query and the field holding its results.
function useTimelockTransactions(chain, queries, idKey) {
  const options = { client: clients[chain] };
  const scheduled = useQuery(queries.scheduled.query, options);
  const executed = useQuery(queries.executed.query, options);
  const cancelled = useQuery(queries.cancelled.query, options);
  const salts = useQuery(queries.salts.query, options);

  const transactions = useMemo(() => {
    if (!scheduled.data || !executed.data || !cancelled.data || !salts.data) {
      return [];
    }
    return processTransactions(
      scheduled.data[queries.scheduled.field],
      executed.data[queries.executed.field],
      cancelled.data[queries.cancelled.field],
      salts.data[queries.salts.field],
      idKey
    );
  }, [
    scheduled.data,
    executed.data,
    cancelled.data,
    salts.data,
    queries,
    idKey,
  ]);

  return {
    transactions,
    loading:
      scheduled.loading ||
      executed.loading ||
      cancelled.loading ||
      salts.loading,
    error: scheduled.error || executed.error || cancelled.error || salts.error,
  };
}

export default useTimelockTransactions;
