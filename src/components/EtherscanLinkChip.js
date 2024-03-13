import Chip from '@mui/material/Chip';
import LinkIcon from '@mui/icons-material/Link';
import { getEtherscanTxUrl } from '../utils/utils';

// Inside your component that renders the table row:
function EtherscanLinkChip({ id, label, chain }) {
  const etherscanUrl = getEtherscanTxUrl(id, chain);

  return (
    <Chip
      label={label}
      clickable
      color="primary"
      icon={<LinkIcon />}
      onClick={() => window.open(etherscanUrl, '_blank')}
      sx={{ cursor: 'pointer' }}
    />
  );
}

export default EtherscanLinkChip;
