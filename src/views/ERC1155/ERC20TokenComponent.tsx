import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractERC115 } from 'hooks/useContractERC1155';

export const ERC20TokenComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  // const [address, setAddress] = useState<string>('');

  const [data, isLoading, isSuccess] = useContractERC115(
    isValid,
    'erc20Token',
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
      <Title title={'Security Token Address'}></Title>
      {isSuccess && (
        <>
          <Typography sx={{ mt: 2 }}>{data.toString()}</Typography>
        </>
      )}
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Consultar
      </Button>
    </React.Fragment>
  );
};
