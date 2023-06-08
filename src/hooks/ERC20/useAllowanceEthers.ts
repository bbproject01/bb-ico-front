import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { myToken } from 'service/web3Service';

export function useAllowanceEthers(
  isValid: boolean,
  owner: string,
  spender: string
): [data: BigNumber | undefined, isLoading: boolean] {
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0));
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

          const tempAllowance = await contract.allowance(owner, spender);
          setAllowance(BigNumber.from(tempAllowance.toString()));
          setIsLoadingComponent(false);
        } catch (error) {
          console.error(error);
          setIsLoadingComponent(false);
        }
      };
      getData();
    }
  }, [owner, spender, isValid]);

  return [allowance, isLoading];
}
