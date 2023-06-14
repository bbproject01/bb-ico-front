/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';
import Title from 'components/Title/Title';

import { useContractERC115 } from 'hooks/useContractERC1155';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useGetTokensOwnedEthers } from 'hooks/ERC1155/useGetTokensOwnedEthers';

export const Transfer1155Component = (): JSX.Element => {
  const [list, dataLoading] = useGetTokensOwnedEthers(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');
  const [id, setID] = useState<string>('');

  const [data, isLoading, isSuccess, status] = useContractERC115(
    isValid,
    'transfer',
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

  const handleChangeIDToken = (event: SelectChangeEvent) => {
    setID(event.target.value);
  };

  const handleChangeAddress = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddress(event.target.value);
  };

  return isLoading || dataLoading ? (
    <CircularProgressBarBox />
  ) : (
    <Box
      component={'form'}
      autoComplete="off"
      sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
    >
      <Stack spacing={2}>
        <Title title={'Tranfer To'}></Title>
        <TextField
          id="filled-basic"
          type="text"
          label="Address"
          variant="filled"
          onChange={handleChangeAddress}
          value={address}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Token Id</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={id}
            label="Token"
            onChange={handleChangeIDToken}
          >
            {list?.map(({ idToken }) => (
              <MenuItem value={idToken.toString()} key={idToken.toString()}>
                {idToken.toString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
