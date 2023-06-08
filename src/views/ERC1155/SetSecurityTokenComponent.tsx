/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractERC115 } from 'hooks/useContractERC1155';
import { isValidEthereumAddress } from 'utils/ethereum';

export const SetSecurityTokenComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');

  const [data, isLoading, isSuccess] = useContractERC115(
    isValid,
    'setERC20Token',
    [address]
  );

  useEffect(() => {
    if (isValidEthereumAddress(address)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [address]);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(address)) {
      setIsValid(true);
    }
  };

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
      <Title title={'Set Security Token Address'}></Title>
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
          <Typography sx={{ mt: 2 }}>{data.toString()}</Typography>
        </>
      )}
    </React.Fragment>
  );
};
