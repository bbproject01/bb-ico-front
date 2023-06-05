import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { myToken } from 'service/web3Service';

export function useBurnEthers(
  isValid: boolean,
  address: string
): [data: BigNumber | undefined, isLoading: boolean] {
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

          const tempBalance = await contract.balanceOf(address);
          setBalanceOf(BigNumber.from(tempBalance.toString()));
          setIsLoadingComponent(false);
        } catch (error) {
          console.error(error);
          setIsLoadingComponent(false);
        }
      };
      getData();
    }
  }, [address, isValid]);

  return [balanceOf, isLoading];
}
