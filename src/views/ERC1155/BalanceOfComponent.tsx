import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractReadERC1155Mumbai } from 'hooks/useContractReadERC1155Mumbai';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const BalanceOfComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [id, setID] = useState<number>(0);

  const [data, isLoading, isSuccess, status] = useContractReadERC1155Mumbai(
    isValid,
    'balanceOf',
    [address, id]
  );

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeAmount = (
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
    <React.Fragment>
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
        onChange={handleChangeAmount}
        value={id}
      />
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
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
