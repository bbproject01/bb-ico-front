/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import Title from 'components/Title/Title';
import { useAccount } from 'wagmi';
import { Button } from '@mui/material';
import { useContractReadERC20Mumbai } from 'hooks/useContractReadERC20Mumbai';
import { ethers } from 'ethers';

export const BalanceCustomERC20Component = (): JSX.Element => {
  const { address: owner = '0x' } = useAccount();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [data, isLoading] = useContractReadERC20Mumbai(isValid, 'balanceOf', [
    owner
  ]);

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
      <Title title={'Security Token Balance'}></Title>
      {data != null ? ethers.utils.formatEther(data) : ''}
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
