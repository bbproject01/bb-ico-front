import React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import Title from 'components/Title/Title';
import { useInfoContractEthers } from 'hooks/ERC20/useInfoContractEthers';
import { Grid } from '@mui/material';

export const Deposits: React.FC = () => {
  const [isLoading, name, owner, symbol, decimals, totalSupply, balance] =
    useInfoContractEthers(true);

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title="Metadata Token ERC20"></Title>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography component="p" variant="h6" gutterBottom>
            Balance Of Account:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6">
            {balance != null ? balance.toString() : ''}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Owner:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">{owner}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6" gutterBottom>
            Name:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6">
            {name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6" gutterBottom>
            Symbol:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6">
            {symbol}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6" gutterBottom>
            Decimals:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6">
            {decimals != null ? decimals.toString() : ''}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6" gutterBottom>
            TotalSupply:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="h6">
            {totalSupply != null ? totalSupply.toString() : ''}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Deposits;
