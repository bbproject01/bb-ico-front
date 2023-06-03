import React, { useEffect, useState } from 'react';

import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import Title from 'components/Title/Title';
import { useBalanceEthers } from 'hooks/useBalanceEthers';
import { isValidEthereumAddress } from 'utils/ethereum';
import { Button, TextField } from '@mui/material';

export const BalanceOfComponent: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');
  // const [data, setData] = useState<BigNumber>(BigNumber.from(0));

  const [balance, isLoading] = useBalanceEthers(isValid, address);

  useEffect(() => {
    if (isValidEthereumAddress(address)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [address]);

  const handleButtonClic = (): void => {
    if (isValidEthereumAddress(address)) {
      setIsValid(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsValid(false);
    setAddress(event.target.value);
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
        value={address}
      />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleButtonClic}
        disabled={!isDisabled}
      >
        Consultar
      </Button>
      {balance != null ? balance.toString() : ''}
    </React.Fragment>
  );
};

export default BalanceOfComponent;
