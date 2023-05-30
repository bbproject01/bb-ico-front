import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractWriteCustom } from 'hooks/useContractWriteCustom';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const MintComponent = (): JSX.Element => {
  const [account, setAccount] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [data, isLoading, isSuccess, write] = useContractWriteCustom(
    isValid,
    'mint',
    [account, amount]
  );

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(account) && amount > 0) {
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
    setAccount(event.target.value);
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
      <Title title={'Mint'}></Title>
      <TextField
        id="filled-basic"
        label="Cuenta a crear nuevos tokens"
        variant="filled"
        onChange={handleChangeAddressSpender}
        value={account}
      />
      <TextField
        id="filled-basic"
        type="number"
        label="Crear:"
        variant="filled"
        onChange={handleChangeAmount}
        value={amount}
      />
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Enviar
      </Button>
      <Typography sx={{ mt: 2 }}>
        {isLoading ? 'Minting...' : 'Mint'}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        {data !== undefined ? data.hash : ''}
      </Typography>
      {isSuccess && (
        <Typography sx={{ mt: 2 }}>Tokens Send to {account}</Typography>
      )}
    </React.Fragment>
  );
};

export default MintComponent;
