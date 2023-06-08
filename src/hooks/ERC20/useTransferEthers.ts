import { type BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { myToken } from 'service/web3Service';

export function useTransferEthers(
  isValid: boolean,
  recipient: string,
  amount: BigNumber
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
          const tx = await contract.transfer(recipient, amount);
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
  }, [recipient, amount, isValid]);

  return [isLoading, isSuccess];
}
