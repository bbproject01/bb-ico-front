import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractWrite } from 'wagmi';
import { myToken } from 'service/web3Service';

export const IncreaseAllowanceComponent = (): JSX.Element => {
  const [spender, setSpender] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...myToken,
    functionName: 'increaseAllowance'
  });

  useEffect(() => {
    if (isValidEthereumAddress(spender) && amount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [spender, amount]);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(spender) && amount > 0) {
      write({ args: [spender, amount] });
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
      <Title title={'IncreaseAllowance'}></Title>
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
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleButtonClic}
        disabled={!isDisabled}
      >
        Enviar
      </Button>
      <Typography sx={{ mt: 2 }}>
        {isLoading ? 'Increasing...' : 'Increase'}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        {data !== undefined ? data.hash : ''}
      </Typography>
      {isSuccess && (
        <Typography sx={{ mt: 2 }}>Tokens Send to {spender}</Typography>
      )}
    </React.Fragment>
  );
};

export default IncreaseAllowanceComponent;
