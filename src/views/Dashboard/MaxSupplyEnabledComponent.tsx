import React from 'react';
import { Button, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractWrite } from 'wagmi';
import { myToken } from 'service/web3Service';

export const MaxSupplyEnabledComponent = (): JSX.Element => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...myToken,
    functionName: 'disableMaxSupply'
  });

  const handleButtonClic = (): void => {
    write();
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Max Supply Disabled'}></Title>
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Desactivar
      </Button>
      <Typography sx={{ mt: 2 }}>{isLoading ? 'Is loading...' : ''}</Typography>
      {isSuccess && <Typography sx={{ mt: 2 }}>{data?.hash}</Typography>}
    </React.Fragment>
  );
};

export default MaxSupplyEnabledComponent;
