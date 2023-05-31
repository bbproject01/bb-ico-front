import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Title from 'components/Title/Title';
// import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractReadERC1155Mumbai } from 'hooks/useContractReadERC1155Mumbai';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';

export const IsApprovedForAllComponent = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [account, setAccount] = useState<string>('');
  const [operator, setOperator] = useState<string>('');

  const [data, isLoading, isSuccess, status] = useContractReadERC1155Mumbai(
    isValid,
    'isApprovedForAll',
    [account, operator]
  );

  useEffect(() => {
    if (isSuccess) {
      setIsValid(false);
    }
  }, [isSuccess]);

  const handleButtonClic = (): void => {
    setIsValid(true);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeOperator = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOperator(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeAccount = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAccount(event.target.value);
  };

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <React.Fragment>
      <Title title={'Is Approval for all'}></Title>
      <TextField
        id="filled-basic"
        type="text"
        label="Account"
        variant="filled"
        onChange={handleChangeAccount}
        value={account}
      />
      <TextField
        id="filled-basic"
        label="Operador"
        variant="filled"
        onChange={handleChangeOperator}
        value={operator}
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
