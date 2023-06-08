/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import Title from 'components/Title/Title';
import { useAccount } from 'wagmi';
import { useAllowanceEthers } from 'hooks/ERC20/useAllowanceEthers';
import { FNFT } from 'service/web3Service';
import { Button } from '@mui/material';

export const AllowanceCustomERC20Component = (): JSX.Element => {
  const { address: owner = '0x' } = useAccount();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [allowance, isLoading] = useAllowanceEthers(
    isValid,
    owner,
    FNFT.address
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
      <Title title={'Allowance'}></Title>
      {allowance != null ? allowance.toString() : ''}
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
