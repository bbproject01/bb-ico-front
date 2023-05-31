import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useAccount } from 'wagmi';
import { useContractReadERC20Mumbai } from 'hooks/useContractReadERC20Mumbai';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const AllowanceComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const { address: owner = '0x' } = useAccount();
  const [spender, setSpender] = useState<string>('');

  const [data, isLoading, isSuccess, status] = useContractReadERC20Mumbai(
    isValid,
    'balanceOf',
    [owner, spender]
  );

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(spender)) {
      setIsValid(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSpender(event.target.value);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Allowance'}></Title>
      <TextField
        id="filled-basic"
        label="Address"
        variant="filled"
        onChange={handleChangeValue}
        value={spender}
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

export default AllowanceComponent;
