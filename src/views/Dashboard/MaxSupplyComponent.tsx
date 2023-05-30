import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { useContractWriteCustom } from 'hooks/useContractWriteCustom';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const MaxSupplyComponent = (): JSX.Element => {
  const [metodERC20, setMetodERC20] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isActivate, setIsActivate] = useState<boolean>(false);

  const [data, isLoading, isSuccess, write] = useContractWriteCustom(
    isValid,
    metodERC20,
    []
  );

  useEffect(() => {
    if (isLoading) {
      setIsValid(false);
    }
  }, [isLoading]);

  const handleButtonClic = (): void => {
    setMetodERC20(isActivate ? 'disableMaxSupply' : 'enableMaxSupply');
    setIsActivate(true);
    setIsValid(true);
    write?.();
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Max Supply'}></Title>
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        {!isActivate ? 'Activar' : 'Desactivar'}
      </Button>
      <Typography sx={{ mt: 2 }}>{isLoading ? 'Is loading...' : ''}</Typography>
      <Typography sx={{ mt: 2 }}>
        {data !== undefined ? data.hash : ''}
      </Typography>
      {isSuccess && <Typography sx={{ mt: 2 }}>{metodERC20}</Typography>}
    </React.Fragment>
  );
};

export default MaxSupplyComponent;
