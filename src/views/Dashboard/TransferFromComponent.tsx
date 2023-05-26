import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { useTransferFromToken } from 'hooks/useTransferFromToken';
import { isValidEthereumAddress } from 'utils/ethereum';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
// import { useTransferToken } from 'hooks/useTransferToken';
// import { useCustomDispatch } from 'hooks/redux';
// import {
//   useContractWrite,
//   usePrepareContractWrite,
//   useWaitForTransaction
// } from 'wagmi';
// import { myToken } from 'service/web3Service';

export const TransferFromComponent = (): JSX.Element => {
  const [spender, setSpender] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [data, isLoading, isSuccess, write] = useTransferFromToken(
    spender,
    to,
    amount,
    isValid
  );

  const handleButtonClic = (): void => {
    if (
      isValidEthereumAddress(spender) &&
      isValidEthereumAddress(to) &&
      amount > 0
    ) {
      setIsValid(true);
      write?.();
    } else {
      setIsValid(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeAddressSpender = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSpender(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeAddressTo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTo(event.target.value);
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

  console.log('data: ', data);

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Transfer from'}></Title>
      <TextField
        id="filled-basic"
        label="Cuenta para gastar tokens"
        variant="filled"
        onChange={handleChangeAddressSpender}
        value={spender}
      />
      <TextField
        id="filled-basic"
        label="Cuenta para recibir tokens"
        variant="filled"
        onChange={handleChangeAddressTo}
        value={to}
      />
      <TextField
        id="filled-basic"
        type="number"
        label="Amount"
        variant="filled"
        onChange={handleChangeAmount}
        value={amount}
      />
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Enviar
      </Button>
      <Typography sx={{ mt: 2 }}>
        {isLoading ? 'Transfering...' : 'Transfer'}
      </Typography>
      {isSuccess && <Typography sx={{ mt: 2 }}>Tokens Send to {to}</Typography>}
    </React.Fragment>
  );
};

export default TransferFromComponent;
