import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { BigNumber, ethers } from 'ethers';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useTransferEthers } from 'hooks/ERC20/useTransferEthers';

export const TransferComponent = (): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [amountBigNumber, setAmountBigNumber] = useState<BigNumber>(
    BigNumber.from('0')
  );
  const [recipient, setRecipient] = useState<string>('');

  const [isLoading, isSuccess] = useTransferEthers(
    isValid,
    recipient,
    amountBigNumber
  );

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isValidEthereumAddress(recipient) && amount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [recipient, amount]);

  const handleButtonClic = (): void => {
    try {
      if (Number(amount) > 0) {
        // console.log(amount.toFixed(18));
        const numberString = ethers.utils.parseUnits(amount.toFixed(18));
        setAmountBigNumber(numberString);
        // console.log(numberString.toString());
        // console.log('Entro aqui');
        setIsValid(true);
      }
    } catch (error) {
      console.log(error);
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
    setRecipient(event.target.value);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Transfer'}></Title>
      <TextField
        id="filled-basic"
        label="Recipient"
        variant="filled"
        onChange={handleChangeSpender}
        value={recipient}
      />
      <TextField
        id="filled-basic"
        label="Amount"
        variant="filled"
        type="number"
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
        Consultar
      </Button>
      {isSuccess ? 'Se realizo la transaccion' : ''}
    </React.Fragment>
  );
};

export default TransferComponent;
