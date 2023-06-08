import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { myToken } from 'service/web3Service';

export function useInfoContractEthers(
  isValid: boolean
): [
  isLoading: boolean,
  name: string,
  owner: string,
  symbol: string,
  decimals: BigNumber,
  totalSupply: BigNumber,
  balanceOf: BigNumber
] {
  const [name, setName] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [decimals, setDecimals] = useState<BigNumber>(BigNumber.from(0));
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from(0));
  const [balanceOf, setBalanceOf] = useState<BigNumber>(BigNumber.from(0));
  const [isLoading, setIsLoadingComponent] = useState<boolean>(false);
  /**
   * WEB3
   */
  // node ENS
  useEffect(() => {
    if (isValid) {
      const getData = async (): Promise<void> => {
        try {
          setIsLoadingComponent(true);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            myToken.address,
            myToken.abi,
            signer
          );

          const tempName = await contract.name();
          const tempOwner = await contract.owner();
          const tempSymbol = await contract.symbol();
          const tempDecimals = await contract.decimals();
          const tempTotalSupply = await contract.totalSupply();
          const tempBalance = await contract.balanceOf(signer.getAddress());
          setName(tempName);
          setOwner(tempOwner);
          setSymbol(tempSymbol);
          setDecimals(BigNumber.from(tempDecimals.toString()));
          setTotalSupply(BigNumber.from(tempTotalSupply.toString()));
          setBalanceOf(BigNumber.from(tempBalance.toString()));
          setIsLoadingComponent(false);
        } catch (error) {
          console.error(error);
          setIsLoadingComponent(false);
        }
      };
      getData();
    }
  }, [isValid]);

  return [isLoading, name, owner, symbol, decimals, totalSupply, balanceOf];
}
