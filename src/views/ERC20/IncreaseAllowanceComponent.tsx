import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useIncreaseAllowanceEthers } from 'hooks/ERC20/useIncreaseAllowanceEthers';

export const IncreaseAllowanceComponent = (): JSX.Element => {
  const [spender, setSpender] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [isLoading, isSuccess] = useIncreaseAllowanceEthers(
    isValid,
    spender,
    amount
  );

  useEffect(() => {
    if (isValidEthereumAddress(spender) && amount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [spender, amount]);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(spender) && amount > 0) {
      setIsValid(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeAddressSpender = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSpender(event.target.value);
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
      <Title title={'Increase Allowance'}></Title>
      <TextField
        id="filled-basic"
        label="Cuenta para gastar tokens"
        variant="filled"
        onChange={handleChangeAddressSpender}
        value={spender}
      />
      <TextField
        id="filled-basic"
        type="number"
        label="Aumentar la cantidad de:"
        variant="filled"
        onChange={handleChangeAmount}
        value={amount}
      />
      <Typography sx={{ mt: 2 }}>Numero:{amount.toFixed(18)} </Typography>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleButtonClic}
        disabled={!isDisabled}
      >
        Enviar
      </Button>
      {isSuccess ? 'Se realizo la transaccion' : ''}
    </React.Fragment>
  );
};

export default IncreaseAllowanceComponent;
