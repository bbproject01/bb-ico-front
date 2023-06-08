import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractERC115 } from 'hooks/useContractERC1155';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const TokenIDCounterComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  // const [address, setAddress] = useState<string>('');

  // const [data, isLoading, isSuccess, status] = useContractReadERC1155Mumbai(
  //   isValid,
  //   'tokenIdCounter',
  //   []
  // );

  const [data, isLoading, isSuccess, status] = useContractERC115(
    isValid,
    'nextTokenId',
    []
  );

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Token ID counter'}></Title>
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
