import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractReadERC1155Mumbai } from 'hooks/useContractReadERC1155Mumbai';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const UriComponent = (): JSX.Element => {
  const [ID, setID] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);
  // const [address, setAddress] = useState<string>('');

  const [data, isLoading, isSuccess, status] = useContractReadERC1155Mumbai(
    isValid,
    'uri',
    [ID]
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
  const handleChangeID = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setID(Number(event.target.value));
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Uri'}></Title>
      <TextField
        id="filled-basic"
        type="number"
        label="ID or Type"
        variant="filled"
        onChange={handleChangeID}
        value={ID}
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
