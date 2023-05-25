import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useAccount } from 'wagmi';
import { useAllowanceToken } from 'hooks/useAllowanceToken';

export const AllowanceComponent = (): JSX.Element => {
  const { address = '0x' } = useAccount();
  const [value, setValue] = useState<string>('');
  const [spender, setSpender] = useState<string>('');

  const _allowance = useAllowanceToken(address, spender);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(value)) {
      setSpender(value);
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
      <Title title={'Allowance'}></Title>
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
      <Typography sx={{ mt: 2 }}>{_allowance.toString()}</Typography>
    </React.Fragment>
  );
};

export default AllowanceComponent;
