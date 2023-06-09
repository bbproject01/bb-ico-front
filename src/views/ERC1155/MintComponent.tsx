import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractERC115 } from 'hooks/useContractERC1155';
import { ethers } from 'ethers';

export const MintFNFTComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [originalTerm, setOriginalTerm] = useState<number>(0);
  const [maximumReduction, setMaximumReduction] = useState<number>(25);
  const [price, setPrice] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [data, isLoading, isSuccess, status] = useContractERC115(
    isValid,
    'mint',
    [
      originalTerm,
      maximumReduction,
      ethers.utils.parseUnits(price.toString(), 18)
    ]
  );

  useEffect(() => {
    if (originalTerm > 0 && originalTerm < 13 && price > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [originalTerm, maximumReduction, price]);

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeOriginalTerm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      setOriginalTerm(Number(event.target.value));
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeMaximumReduction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      setMaximumReduction(Number(event.target.value));
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangePrice = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      setPrice(Number(event.target.value));
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
        <Title title={'Mint'}></Title>
        <TextField
          id="filled-basic"
          type="number"
          InputProps={{
            inputProps: {
              min: 1,
              max: 12
            }
          }}
          label="Plazo en Meses del FNFT"
          variant="filled"
          onChange={handleChangeOriginalTerm}
          value={originalTerm}
        />
        <TextField
          id="filled-basic"
          type="number"
          label="Reducción máxima permitida"
          variant="filled"
          onChange={handleChangeMaximumReduction}
          value={maximumReduction}
          disabled={true}
        />
        <TextField
          id="filled-basic"
          type="number"
          label="Precio en tokens ERC20"
          variant="filled"
          onChange={handleChangePrice}
          value={price}
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
      </Stack>
    </Box>
  );
};
