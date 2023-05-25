import React, { useEffect, useState } from 'react';
// import { ethers, getDefaultProvider } from 'ethers';
import { ethers } from 'ethers';
import { myToken } from '../service/web3Service';
import { Box, Button, Typography } from '@mui/material';
import { LabelAndText } from 'components/LabelAndText';

import { useCustomSelector, useCustomDispatch } from 'hooks/redux';
import {
  setAddressToken,
  setDecimals,
  setName,
  setSymbol,
  setTotalSupply
} from 'store/TokenBNB';

export const HomeView: React.FC = () => {
  const [network, setNetwork] = useState('');

  const {
    tokenBNB: { addressToken, name, symbol, decimals, totalSupply }
  } = useCustomSelector((state) => state);

  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(setAddressToken(myToken.address));
    setNetwork(network);
  }, [network, dispatch]);

  const handleButtonClick = async (): Promise<void> => {
    try {
      // let signer = null;
      // let provider;
      // if (window.ethereum == null) {
      //   console.log('MetaMask not installed; using read-only defaults');
      //   provider = getDefaultProvider;
      // } else {
      //   provider = new ethers.BrowserProvider(window.ethereum);
      //   signer = await provider.getSigner();
      //   const network = await provider.getNetwork();
      //   console.log('network: ', network);
      //   setNetwork(network.name);
      // }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(addressToken, myToken.abi, signer);

      const tempName = await contract.name();
      const tempSymbol = await contract.symbol();
      const tempDecimals = await contract.decimals();
      const tempTotalSupply = await contract.totalSupply();

      dispatch(setName(tempName.toString()));
      dispatch(setSymbol(tempSymbol.toString()));
      dispatch(setDecimals(tempDecimals.toString()));
      dispatch(setTotalSupply(tempTotalSupply.toString()));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h2">
        Interfaz de Usuario para Smart Contract
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          handleButtonClick();
        }}
      >
        Obtener datos
      </Button>
      {network.length > 0 && (
        <LabelAndText title="Network:" subtitle={network} />
      )}
      {addressToken.length > 0 && (
        <LabelAndText title="Address:" subtitle={addressToken} />
      )}
      {name.length > 0 && <LabelAndText title="Name:" subtitle={name} />}
      {symbol.length > 0 && <LabelAndText title="Symbol:" subtitle={symbol} />}
      {decimals.length > 0 && (
        <LabelAndText title="Decimals:" subtitle={decimals} />
      )}
      {totalSupply.length > 0 && (
        <LabelAndText title="Total Supply:" subtitle={totalSupply} />
      )}
    </Box>
  );
};
