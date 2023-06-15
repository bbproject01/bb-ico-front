import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractERC115 } from 'hooks/useContractERC1155';

export const WithDrawComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [data, isLoading, isSuccess, status, error] = useContractERC115(
    isValid,
    'withDrawFNFT',
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
    if (isSuccess || error !== null) {
      setIsValid(false);
    }
  }, [isSuccess, error]);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeID = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      setId(Number(event.target.value));
    } catch (error) {
      console.log(error);
    }
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
        <Title title={'Withdraw'}></Title>
        <TextField
          id="filled-basic"
          type="number"
          label="ID del FNFT"
          variant="filled"
          onChange={handleChangeID}
          value={id}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleButtonClic}
          disabled={!isDisabled}
        >
          Enviar
        </Button>
        {isSuccess && (
          <>
            <Typography sx={{ mt: 2 }}>
              {isLoading ? 'Minting...' : `Mint ${status}`}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {data !== undefined ? data.hash : ''}
            </Typography>
          </>
        )}
        {error === null ? null : (
          <>
            <Typography sx={{ mt: 2 }}>Name: {error.name}</Typography>
            <Typography sx={{ mt: 2 }}>Message: {error.message}</Typography>
            <Typography sx={{ mt: 2 }}>
              Cause:
              {error.cause !== undefined ? '' : error.cause}
            </Typography>
            <Typography sx={{ mt: 2 }}>Stack: {error.stack}</Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};
