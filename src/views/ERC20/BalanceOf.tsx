import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractReadERC20Mumbai } from 'hooks/useContractReadERC20Mumbai';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const BalanceOf = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');

  const [data, isLoading, isSuccess, status] = useContractReadERC20Mumbai(
    isValid,
    'balanceOf',
    [address]
  );

  useEffect(() => {
    if (isValidEthereumAddress(address)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [address]);

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsValid(false);
    setAddress(event.target.value);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Balance Of'}></Title>
      <TextField
        id="filled-basic"
        label="Address"
        variant="filled"
        onChange={handleChangeValue}
        value={address}
      />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleButtonClic}
        disabled={!isDisabled}
      >
        Consultar
      </Button>
      {isSuccess && (
        <>
          <Typography sx={{ mt: 2 }}>Resultado:{status} </Typography>
          <Typography sx={{ mt: 2 }}>{data.toString()}</Typography>
        </>
      )}
    </React.Fragment>
  );
};

export default BalanceOf;
