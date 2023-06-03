import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useApproveEthers } from 'hooks/ERC20/useApproveEthers';

export const ApproveComponent = (): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [spender, setSpender] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const [isLoading, isSuccess] = useApproveEthers(isValid, spender, amount);

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

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
  const handleChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(Number(event.target.value));
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeSpender = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSpender(event.target.value);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Approve'}></Title>
      <TextField
        id="filled-basic"
        label="Address"
        variant="filled"
        onChange={handleChangeSpender}
        value={spender}
      />
      <TextField
        id="filled-basic"
        label="Amount"
        variant="filled"
        type="number"
        onChange={handleChangeAmount}
        value={amount}
      />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleButtonClic}
        disabled={!isDisabled}
      >
        Consultar
      </Button>
      {isSuccess ? 'Se realizo la transaccion' : ''}
    </React.Fragment>
  );
};

export default ApproveComponent;
