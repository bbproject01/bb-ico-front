import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
// import { useTransferToken } from 'hooks/useTransferToken';
// import { useCustomDispatch } from 'hooks/redux';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';
import { myToken } from 'service/web3Service';

export const ApproveComponent = (): JSX.Element => {
  const [to, setTo] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const [isValid, setIsValid] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    address: '0x5080b3ab6a3B5e8893F085B33696d74d1377B5c8',
    abi: myToken.abi,
    functionName: 'approve',
    args: [to, amount],
    enabled: isValid
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(to) && amount > 0) {
      setIsValid(true);
      write?.();
    } else {
      setIsValid(false);
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

  return (
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
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Agregar
      </Button>
      <Typography sx={{ mt: 2 }}>
        {isLoading ? 'Approving...' : 'Approve'}
      </Typography>
      {isSuccess && (
        <Typography sx={{ mt: 2 }}>Tokens approve to {to}</Typography>
      )}
    </React.Fragment>
  );
};

export default ApproveComponent;
