import {
  processTransactions,
  decodeTransactionData,
  findContractNameByAddress,
  getEtherscanTxUrl,
} from './utils';
import { calculateProgress } from '../components/ProgressWithLabel';

const ID_KEY = 'LowSecTimelock_id';
const OPERATION = `0x${'11'.repeat(32)}`;

const scheduled = (overrides = {}) => ({
  id: '0xentity',
  [ID_KEY]: OPERATION,
  index: '0',
  target: '0x0000000000000000000000000000000000000001',
  value: '0',
  data: '0x',
  delay: '100',
  blockTimestamp: '1000',
  ...overrides,
});

const event = (blockTimestamp) => ({ [ID_KEY]: OPERATION, blockTimestamp });

describe('processTransactions', () => {
  const stateOf = (rows, executed = [], cancelled = []) =>
    processTransactions(rows, executed, cancelled, [], ID_KEY).map(
      (row) => row.state
    );

  it('marks an operation with no later events as Scheduled', () => {
    expect(stateOf([scheduled()])).toEqual(['Scheduled']);
  });

  it('marks an operation as Executed or Cancelled from its events', () => {
    expect(stateOf([scheduled()], [event('1100')])).toEqual(['Executed']);
    expect(stateOf([scheduled()], [], [event('1050')])).toEqual(['Cancelled']);
  });

  it('does not apply an old cancellation to a rescheduled operation', () => {
    const rows = [
      scheduled({ id: '0xfirst' }),
      scheduled({ id: '0xsecond', blockTimestamp: '2000' }),
    ];
    expect(stateOf(rows, [], [event('1500')])).toEqual([
      'Cancelled',
      'Scheduled',
    ]);
  });

  it('exposes numeric times, whatever the locale', () => {
    const [row] = processTransactions([scheduled()], [], [], [], ID_KEY);
    expect(row.timestampMs).toBe(1000000);
    expect(row.etaMs).toBe(1100000);
  });

  it('keeps full precision for 32-byte salts', () => {
    const salt = `0x${'ab'.repeat(32)}`;
    const [row] = processTransactions(
      [scheduled()],
      [],
      [],
      [{ [ID_KEY]: OPERATION, salt }],
      ID_KEY
    );
    expect(row.salt).toBe(
      '77648812782670860460512307594061302913369283834606025297048026922953510464427'
    );
  });

  it('shows a dash when there is no salt', () => {
    const [row] = processTransactions([scheduled()], [], [], [], ID_KEY);
    expect(row.salt).toBe('-');
  });
});

describe('calculateProgress', () => {
  it('reports the share of the delay that has passed', () => {
    expect(calculateProgress(1000, 2000, 1500)).toBe(50);
  });

  it('stays between 0 and 100', () => {
    expect(calculateProgress(1000, 2000, 500)).toBe(0);
    expect(calculateProgress(1000, 2000, 3000)).toBe(100);
  });

  it('handles missing times and a zero delay', () => {
    expect(calculateProgress(null, 2000, 1500)).toBe(0);
    expect(calculateProgress(1000, 1000, 1000)).toBe(100);
  });
});

describe('contract helpers', () => {
  const CDP_MANAGER = '0xc4cbaE499bb4Ca41E78f52F07f5d98c375711774';

  it('finds contract names regardless of address case', () => {
    expect(
      findContractNameByAddress(CDP_MANAGER.toLowerCase(), 'mainnet')
    ).toBe('CdpManager');
    expect(findContractNameByAddress(CDP_MANAGER, 'sepolia')).toBeNull();
  });

  it('reports calldata for an unknown target as not decodable', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = decodeTransactionData(
      '0x1234',
      '0x0000000000000000000000000000000000000001',
      'mainnet'
    );
    expect(result).toEqual({
      decodedData: 'Could not decode',
      rawData: '0x1234',
    });
    spy.mockRestore();
  });

  it('builds Etherscan links per chain from the transaction hash', () => {
    const hash = `0x${'ab'.repeat(32)}`;
    expect(getEtherscanTxUrl(`${hash}00000001`, 'mainnet')).toBe(
      `https://etherscan.io/tx/${hash}`
    );
    expect(getEtherscanTxUrl(hash, 'sepolia')).toBe(
      `https://sepolia.etherscan.io/tx/${hash}`
    );
  });
});
