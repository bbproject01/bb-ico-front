import { BigNumber, ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { myToken } from 'service/web3Service';
// import { isValidEthereumAddress } from 'utils/ethereum';
// import { useContractRead } from 'wagmi';
import { useCustomDispatch } from './redux';
import { setBalanceFrom } from 'store/TokenBNB';
import { useNetwork } from 'wagmi';

export function useBalanceOf(
  input: string,
  isValid: boolean
): [boolean, boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { chain } = useNetwork();
  const dispatch = useCustomDispatch();

  useEffect(() => {
    if (isValid) {
      try {
        if (chain !== null) {
          const callData = async (): Promise<void> => {
            setIsLoading(true);
            const addressContract =
              '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE';
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
              addressContract,
              myToken.abi,
              signer
            );
            console.log(input);
            const tempBalance = await contract.balanceOf(input);
            console.log(tempBalance);
            console.log('bignumber: ', BigNumber.from(tempBalance));
            console.log(typeof tempBalance);
            dispatch(setBalanceFrom(BigNumber.from(tempBalance)));
            setIsLoading(false);
            setIsSuccess(true);
          };
          callData();
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  }, [chain, dispatch, input, isValid]);

  // /**
  //  * WEB3
  //  */
  // // node ENS
  // useContractRead({
  //   address: '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE',
  //   abi: myToken.abi,
  //   enabled: isValid,
  //   functionName: 'balanceOf',
  //   args: [input],
  //   onSuccess(data: any) {
  //     if (data === '') {
  //       setValue(BigNumber.from('0'));
  //     } else {
  //       // const withDecimals = data / BigInt(1000000000000000000);

  //       setValue(BigNumber.from(data));
  //     }
  //   },
  //   onError(error) {
  //     console.log('ERROR:', error);
  //   }
  // });

  return [isLoading, isSuccess];
}
