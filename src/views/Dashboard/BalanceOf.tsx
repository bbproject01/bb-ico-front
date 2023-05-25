import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useBalanceOf } from 'hooks/useBalanceToken';

export const BalanceOf = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const _balance = useBalanceOf(address);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(value)) {
      setAddress(value);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  return (
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
      <Typography sx={{ mt: 2 }}>Resultado: </Typography>
      <Typography sx={{ mt: 2 }}>{_balance.toString()}</Typography>
    </React.Fragment>
  );
};

export default BalanceOf;
