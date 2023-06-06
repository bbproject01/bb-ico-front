import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useDisableMaxSupplyEthers } from 'hooks/ERC20/useDisableMaxSupplyEthers';

export const MaxSupplyDisabledComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, isSuccess] = useDisableMaxSupplyEthers(isValid);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Max Supply Disabled'}></Title>
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Activar
      </Button>
      <Typography sx={{ mt: 2 }}>{isLoading ? 'Is loading...' : ''}</Typography>
      {isSuccess ? 'Se realizo la transaccion' : ''}
    </React.Fragment>
  );
};

export default MaxSupplyDisabledComponent;
