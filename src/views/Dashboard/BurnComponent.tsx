import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { useContractWriteCustom } from 'hooks/useContractWriteCustom';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const BurnComponent = (): JSX.Element => {
  const [amount, setAmount] = useState<number>(0);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [data, isLoading, isSuccess, write] = useContractWriteCustom(
    isValid,
    'burn',
    [amount]
  );

  const handleButtonClic = (): void => {
    if (amount > 0) {
      setIsValid(true);
      write?.();
    } else {
      setIsValid(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      setAmount(Number(event.target.value));
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Burn'}></Title>
      <TextField
        id="filled-basic"
        type="number"
        label="Eliminar la cantidad de:"
        variant="filled"
        onChange={handleChangeAmount}
        value={amount}
      />
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Enviar
      </Button>
      <Typography sx={{ mt: 2 }}>
        {isLoading ? 'Burnning...' : 'Burn'}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        {data !== undefined ? data.hash : ''}
      </Typography>
      {isSuccess && <Typography sx={{ mt: 2 }}>Tokens deleted</Typography>}
    </React.Fragment>
  );
};

export default BurnComponent;
