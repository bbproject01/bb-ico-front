import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useEnableMaxSupplyEthers } from 'hooks/ERC20/useEnableMaxSupplyEthers';

export const MaxSupplyEnabledComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, isSuccess] = useEnableMaxSupplyEthers(isValid);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Max Supply Enabled'}></Title>
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Activar
      </Button>
      <Typography sx={{ mt: 2 }}>{isLoading ? 'Is loading...' : ''}</Typography>
      {isSuccess ? 'Se realizo la transaccion' : ''}
    </React.Fragment>
  );
};

export default MaxSupplyEnabledComponent;
