import * as React from 'react';
import Title from './Title';
import { Typography } from '@mui/material';

interface IData {
  network: string | undefined;
  address: string | undefined;
}

export const NetworkComponent = ({ network, address }: IData): JSX.Element => {
  return (
    <React.Fragment>
      <Title title="Network"></Title>
      <Typography>{network}</Typography>
      <Typography>{address}</Typography>
    </React.Fragment>
  );
};
