import React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import Title from 'components/Title/Title';
import { useInfoContractEthers } from 'hooks/ERC20/useInfoContractEthers';

export const Deposits: React.FC = () => {
  const [isLoading, name, owner, symbol, decimals, totalSupply, balance] =
    useInfoContractEthers(true);

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title="Info"></Title>
      <Typography component="p" variant="h6" gutterBottom>
        Owner:
      </Typography>
      <Typography component="p" variant="h6">
        {owner}
      </Typography>
      <Typography component="p" variant="h6" gutterBottom>
        Name:
      </Typography>
      <Typography component="p" variant="h6">
        {name}
      </Typography>
      <Typography component="p" variant="h6" gutterBottom>
        Symbol:
      </Typography>
      <Typography component="p" variant="h6">
        {symbol}
      </Typography>
      <Typography component="p" variant="h6" gutterBottom>
        Decimals:
      </Typography>
      <Typography component="p" variant="h6">
        {decimals != null ? decimals.toString() : ''}
      </Typography>
      <Typography component="p" variant="h6" gutterBottom>
        TotalSupply:
      </Typography>
      <Typography component="p" variant="h6">
        {totalSupply != null ? totalSupply.toString() : ''}
      </Typography>
      <Typography component="p" variant="h6" gutterBottom>
        Balance Of Account:
      </Typography>
      <Typography component="p" variant="h6">
        {balance != null ? balance.toString() : ''}
      </Typography>
    </React.Fragment>
  );
};

export default Deposits;
