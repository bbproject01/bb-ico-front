import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Title from 'components/Title/Title';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useAccount } from 'wagmi';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useAllowanceEthers } from 'hooks/ERC20/useAllowanceEthers';

export const AllowanceComponent = (): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { address: owner = '0x' } = useAccount();
  const [spender, setSpender] = useState<string>('');

  const [allowance, isLoading] = useAllowanceEthers(isValid, owner, spender);

  useEffect(() => {
    if (isValidEthereumAddress(spender)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [spender]);

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
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleButtonClic}
        disabled={!isDisabled}
      >
        Consultar
      </Button>
      {allowance != null ? allowance.toString() : ''}
    </React.Fragment>
  );
};

export default AllowanceComponent;
