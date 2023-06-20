/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractERC115 } from 'hooks/useContractERC1155';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const TokenIDCounterComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(true);
  // const [address, setAddress] = useState<string>('');

  // const [data, isLoading, isSuccess, status] = useContractReadERC1155Mumbai(
  //   isValid,
  //   'tokenIdCounter',
  //   []
  // );

  const [data, isLoading, isSuccess] = useContractERC115(
    isValid,
    'nextTokenId',
    []
  );

  const handleRefreshClick = () => {
    setIsValid(false); // Establecer isValid en falso para detener la ejecución del hook

    setTimeout(() => {
      setIsValid(true); // Establecer isValid en verdadero nuevamente después de un corto período de tiempo para reiniciar la ejecución del hook
    }, 500);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Token ID counter'}></Title>
      {isSuccess && (
        <>
          <Typography sx={{ mt: 2 }}>{data.toString()}</Typography>
        </>
      )}
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => {
          handleRefreshClick();
        }}
        disabled={!isValid}
      >
        Consultar
      </Button>
    </React.Fragment>
  );
};
