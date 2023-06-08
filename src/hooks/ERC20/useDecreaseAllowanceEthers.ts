import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { myToken } from 'service/web3Service';

export function useDecreaseAllowanceEthers(
  isValid: boolean,
  address: string,
  subtractedValue: number
): [isLoading: boolean, isSuccess: boolean] {
  const [isSuccess, setIsSucces] = useState<boolean>(false);
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

          const tx = await contract.decreaseAllowance(
            address,
            parseUnits(subtractedValue.toFixed(18).toString())
          );
          await tx.wait();
          setIsSucces(true);
          setIsLoadingComponent(false);
        } catch (error) {
          console.error(error);
          setIsLoadingComponent(false);
        }
      };
      getData();
    }
  }, [address, subtractedValue, isValid]);

  return [isLoading, isSuccess];
}
