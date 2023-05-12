import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useCustomSelector } from 'hooks/redux';

const preventDefault = (event: React.MouseEvent): void => {
  event.preventDefault();
};

export const Deposits: React.FC = () => {
  const {
    tokenBNB: { totalSupply }
  } = useCustomSelector((state) => state);

  return (
    <React.Fragment>
      <Title title="Total Supply"></Title>
      <Typography component="p" variant="h4">
        {totalSupply}
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
