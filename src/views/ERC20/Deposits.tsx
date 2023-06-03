import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useAccount } from 'wagmi';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import Title from 'components/Title/Title';
import { useBalanceEthers } from 'hooks/ERC20/useBalanceEthers';

const preventDefault = (event: React.MouseEvent): void => {
  event.preventDefault();
};

export const Deposits: React.FC = () => {
  const { address = '0x' } = useAccount();
  // const [data, setData] = useState<BigNumber>(BigNumber.from(0));

  const [balance, isLoading] = useBalanceEthers(true, address);

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title="Balance"></Title>
      <Typography component="p" variant="h4">
        {balance != null ? balance.toString() : ''}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;
