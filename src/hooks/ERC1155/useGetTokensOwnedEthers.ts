import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { FNFT } from 'service/web3Service';

export interface ITokenOwned {
  idToken: BigNumber;
  balance: BigNumber;
}

export function useGetTokensOwnedEthers(
  isValid: boolean
): [data: ITokenOwned[] | undefined, isLoading: boolean] {
  const [tokensIDs, setTokensIDs] = useState<BigNumber[]>([]);
  const [tokensOwned, setTokensOwned] = useState<ITokenOwned[]>([]);
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
          const contract = new ethers.Contract(FNFT.address, FNFT.abi, signer);

          const tempTokensOwner = await contract.getTokensOwner();

          setTokensIDs(tempTokensOwner);
          setIsLoadingComponent(false);
        } catch (error) {
          console.error(error);
          setIsLoadingComponent(false);
        }
      };
      getData();
    }
  }, [isValid]);

  useEffect(() => {
    if (tokensIDs.length > 0) {
      const getData = async (): Promise<void> => {
        try {
          setIsLoadingComponent(true);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(FNFT.address, FNFT.abi, signer);

          const account = await signer.getAddress();
          let arrayTemp: ITokenOwned[] = [];
          for await (const iterator of tokensIDs) {
            const balance = await contract.balanceOf(
              account,
              iterator.toString()
            );

            const tokenOwned: ITokenOwned = {
              idToken: iterator,
              balance: BigNumber.from(balance)
            };
            arrayTemp = [...arrayTemp, tokenOwned];
          }
          setTokensOwned(arrayTemp);

          setIsLoadingComponent(false);
        } catch (error) {
          console.error(error);
          setIsLoadingComponent(false);
        }
      };
      getData();
    }
  }, [tokensIDs]);

  return [tokensOwned, isLoading];
}
