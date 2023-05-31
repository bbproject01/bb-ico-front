import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useContractReadERC20 } from 'hooks/useContractReadERC20';
// import { useBalanceOf } from 'hooks/useBalanceToken';
// import { useCustomSelector } from 'hooks/redux';

export const BalanceOf = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  // const {
  //   tokenBNB: { balanceFrom }
  // } = useCustomSelector((state) => state);

  const [_balance, isLoading, isSuccess] = useContractReadERC20(
    isValid,
    'balanceOf',
    [address]
  );
  // const [isLoading, isSuccess] = useBalanceOf(address, isValid);

  useEffect(() => {
    if (isLoading) {
      setIsValid(false);
    }
  }, [isLoading]);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(value)) {
      setAddress(value);
      setIsValid(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Balance Of'}></Title>
      <TextField
        id="filled-basic"
        label="Address"
        variant="filled"
        onChange={handleChangeValue}
        value={value}
      />
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleButtonClic}>
        Consultar
      </Button>
      {isSuccess && (
        <>
          <Typography sx={{ mt: 2 }}>Resultado: </Typography>
          {/* <Typography sx={{ mt: 2 }}>{balanceFrom.toString()}</Typography> */}
          <Typography sx={{ mt: 2 }}>{_balance.toString()}</Typography>
        </>
      )}
    </React.Fragment>
  );
};

export default BalanceOf;
