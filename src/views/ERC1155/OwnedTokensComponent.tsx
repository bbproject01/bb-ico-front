/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useContractERC115 } from 'hooks/useContractERC1155';
import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { type BigNumber, ethers } from 'ethers';
import Title from 'components/Title/Title';

export const OwnedTokensComponent = (): JSX.Element => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const getAddress = async () => {
      const accounts = await provider.listAccounts();
      setAddress(accounts[0]);
    };

    getAddress();
  }, [provider]);

  const [data, isLoading, isSuccess] = useContractERC115(true, 'ownedTokens', [
    address
  ]);

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <Box>
      <Title title={'Owned Tokens'}></Title>
      {isSuccess &&
        data.map((token: BigNumber) => (
          <Card key={token.toString()}>
            <CardContent>
              <Typography variant="h5">{token.toString()}</Typography>
              <Typography>Balance: {token.toString()}</Typography>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};
