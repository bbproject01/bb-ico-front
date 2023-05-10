import React, { useState } from 'react';
import { ethers } from 'ethers';
import { myToken } from '../service/web3Service';
import { getDefaultProvider } from 'ethers';


export function HomeView() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  

  const handleButtonClick = async () => {
    try {
      let signer = null;
      let provider;
      if (window.ethereum == null) {

          // If MetaMask is not installed, we use the default provider,
          // which is backed by a variety of third-party services (such
          // as INFURA). They do not have private keys installed so are
          // only have read-only access
          console.log("MetaMask not installed; using read-only defaults")
          provider = getDefaultProvider;

      } else {

          // Connect to the MetaMask EIP-1193 object. This is a standard
          // protocol that allows Ethers access to make all read-only
          // requests through MetaMask.
          provider = new ethers.BrowserProvider(window.ethereum);

          // It also provides an opportunity to request access to write
          // operations, which will be performed by the private key
          // that MetaMask manages for the user.
          signer = await provider.getSigner();
      }
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      const contract = new ethers.Contract(myToken.address_goerli, myToken.abi, signer);
      console.log('Entro aqui 1');
      
      const temp_name = await contract.name();
      const temp_symbol = await contract.symbol();
      const temp_decimals = await contract.decimals();
      const temp_totalSupply = await contract.totalSupply();
      
      setName(temp_name.toString());
      setSymbol(temp_symbol.toString());
      setDecimals(temp_decimals.toString());
      setTotalSupply(temp_totalSupply.toString());
      console.log('Entro aqui 3');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Interfaz de Usuario para Smart Contract</h1>
      <button onClick={handleButtonClick}>Obtener datos</button>
      {name && (
        <p>Name: {name}</p>
      )}
      {symbol && (
        <p>Symbol: {symbol}</p>
      )}
      {decimals && (
        <p>Decimals: {decimals}</p>
      )}
      {totalSupply && (
        <p>Total Supply: {totalSupply}</p>
      )}
    </div>
  );
}

