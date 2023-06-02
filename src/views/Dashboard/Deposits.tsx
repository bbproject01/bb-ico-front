import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useAccount, useContractRead } from 'wagmi';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { myToken } from 'service/web3Service';
import { BigNumber } from 'ethers';

const preventDefault = (event: React.MouseEvent): void => {
  event.preventDefault();
};

export const Deposits: React.FC = () => {
  const { address = '0x' } = useAccount();
  const [data, setData] = useState<BigNumber>(BigNumber.from(0));

  const { isLoading } = useContractRead({
    ...myToken,
    functionName: 'balanceOf',
    args: [address],
    onSuccess(data) {
      setData(BigNumber.from(data));
      console.log('Success', data);
    }
  });

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title="Balance"></Title>
      <Typography component="p" variant="h4">
        {data.toString()}
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
