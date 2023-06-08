import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';

import { useContractERC115 } from 'hooks/useContractERC1155';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { isValidEthereumAddress } from 'utils/ethereum';

export const BalanceOfComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');
  const [id, setID] = useState<number>(0);

  const [data, isLoading, isSuccess, status] = useContractERC115(
    isValid,
    'balanceOf',
    [address, id]
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
  const handleChangeIDToken = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setID(Number(event.target.value));
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeAddress = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddress(event.target.value);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <Box
      component={'form'}
      autoComplete="off"
      sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
    >
      <Stack spacing={2}>
        <Title title={'Balance Of'}></Title>
        <TextField
          id="filled-basic"
          type="text"
          label="Address"
          variant="filled"
          onChange={handleChangeAddress}
          value={address}
        />
        <TextField
          id="filled-basic"
          type="number"
          label="ID or Type"
          variant="filled"
          onChange={handleChangeIDToken}
          value={id}
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
      </Stack>
    </Box>
  );
};
