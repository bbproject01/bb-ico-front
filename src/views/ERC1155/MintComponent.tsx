import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { FNFT } from 'service/web3Service';
import { useContractWrite } from 'wagmi';

export const MintFNFTComponent = (): JSX.Element => {
  const [originalTerm, setOriginalTerm] = useState<number>(0);
  const [maximumReduction, setMaximumReduction] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...FNFT,
    functionName: 'mint'
  });

  useEffect(() => {
    if (originalTerm > 0 && maximumReduction > 0 && price > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [originalTerm, maximumReduction, price]);

  const handleButtonClic = (): void => {
    write({
      args: [originalTerm, maximumReduction, price]
    });
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
    <React.Fragment>
      <Title title={'Mint'}></Title>
      <TextField
        id="filled-basic"
        type="number"
        label="Plazo original del FNFT"
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
      <Typography sx={{ mt: 2 }}>
        {isLoading ? 'Minting...' : 'Mint'}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        {data !== undefined ? data.hash : ''}
      </Typography>
      {isSuccess && (
        <Typography sx={{ mt: 2 }}>
          Tokens Send to {data?.hash ?? ''}
        </Typography>
      )}
    </React.Fragment>
  );
};
