import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractWrite } from 'wagmi';
import { myToken } from 'service/web3Service';

export const ApproveComponent = (): JSX.Element => {
  const [to, setTo] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...myToken,
    functionName: 'approve'
  });

  useEffect(() => {
    if (isValidEthereumAddress(to) && amount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [to, amount]);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(to) && amount > 0) {
      write({
        args: [to, amount]
      });
    }
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

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Approve'}></Title>
      <TextField
        id="filled-basic"
        label="Address"
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
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleButtonClic}
        disabled={!isDisabled}
      >
        Agregar
      </Button>
      <Typography sx={{ mt: 2 }}>
        {isLoading ? 'Approving...' : 'Approve'}
      </Typography>
      {isSuccess && (
        <>
          <Typography sx={{ mt: 2 }}>Hash: {data?.hash}</Typography>
          <Typography sx={{ mt: 2 }}>Tokens approve to {to}</Typography>
        </>
      )}
    </React.Fragment>
  );
};

export default ApproveComponent;
