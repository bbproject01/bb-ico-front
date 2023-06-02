import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractWrite } from 'wagmi';
import { myToken } from 'service/web3Service';

export const BurnComponent = (): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(0);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...myToken,
    functionName: 'burn'
  });

  useEffect(() => {
    if (amount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [amount]);

  const handleButtonClic = (): void => {
    if (amount > 0) {
      write({ args: [amount] });
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
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleButtonClic}
        disabled={!isDisabled}
      >
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
