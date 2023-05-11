import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { myToken } from '../service/web3Service';
import { getDefaultProvider } from 'ethers';
import { Box, Button, Typography } from '@mui/material';
import { LabelAndText } from 'components/LabelAndText';




export function HomeView() {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [totalSupply, setTotalSupply] = useState('');

  useEffect(() => {
    const temp = (network === 'matic-mumbai') ? myToken.address_matic : myToken.address_goerli;
    setAddress(temp);
  }, [network])
  

  const handleButtonClick = async () => {
    try {
      let signer = null;
      let provider;
      if (window.ethereum == null) {
          console.log("MetaMask not installed; using read-only defaults")
          provider = getDefaultProvider;
      } else {
          provider = new ethers.BrowserProvider(window.ethereum);
          signer = await provider.getSigner();
          const network = await provider.getNetwork();
          setNetwork(network.name);
      }
      const contract = new ethers.Contract(address, myToken.abi, signer);

      const temp_name = await contract.name();
      const temp_symbol = await contract.symbol();
      const temp_decimals = await contract.decimals();
      const temp_totalSupply = await contract.totalSupply();
      
      setName(temp_name.toString());
      setSymbol(temp_symbol.toString());
      setDecimals(temp_decimals.toString());
      setTotalSupply(temp_totalSupply.toString());
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Box>
      <Typography variant='h2' >Interfaz de Usuario para Smart Contract</Typography>
      <Button variant='contained' onClick={handleButtonClick}>Obtener datos</Button>
      {network && (
        <LabelAndText title='Network:' subtitle={network} />
      )}
      {address && (
        <LabelAndText title='Address:' subtitle={address} />
      )}
      {name && (
        <LabelAndText title='Name:' subtitle={name} />
      )}
      {symbol && (
        <LabelAndText title='Symbol:' subtitle={symbol} />
      )}
      {decimals && (
        <LabelAndText title='Decimals:' subtitle={decimals} />
      )}
      {totalSupply && (
        <LabelAndText title='Total Supply:' subtitle={totalSupply} />
      )}
    </Box>
  );
}

