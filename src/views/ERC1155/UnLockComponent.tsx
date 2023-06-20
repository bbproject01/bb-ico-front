/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';

import { useContractERC115 } from 'hooks/useContractERC1155';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const UnlockComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [id, setID] = useState<number>(0);

  const [data, isLoading, isSuccess, status] = useContractERC115(
    isValid,
    'unlock',
    [id]
  );

  useEffect(() => {
    if (id > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  const handleChangeIDToken = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setID(Number(event.target.value));
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
        <Title title={'Unlock'}></Title>
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
            <Typography sx={{ mt: 2 }}>{JSON.stringify(data)}</Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};
