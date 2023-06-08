import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useApproveEthers } from 'hooks/ERC20/useApproveEthers';
import { FNFT } from 'service/web3Service';

export const ApproveCustomERC20Component = (): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  const [isLoading, isSuccess] = useApproveEthers(
    isValid,
    FNFT.address,
    amount
  );

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (amount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [amount]);

  const handleButtonClic = (): void => {
    if (amount > 0) {
      setIsValid(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(Number(event.target.value));
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Approve'}></Title>
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
