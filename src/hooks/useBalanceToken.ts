import { BigNumber } from 'ethers';
import { useState, useEffect } from 'react';
import { myToken } from 'service/web3Service';
import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractRead } from 'wagmi';

export function useBalanceOf(input: string): [BigNumber] {
  const [value, setValue] = useState<BigNumber>(BigNumber.from('0'));
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const callData = (): void => {
      if (isValidEthereumAddress(input)) {
        setIsValid(true);
      } else {
        setIsValid(false);
        setValue(BigNumber.from(input));
      }
    };

    if (input !== '') callData();
  }, [input]);

  /**
   * WEB3
   */
  // node ENS
  useContractRead({
    address: '0x5080b3ab6a3B5e8893F085B33696d74d1377B5c8',
    abi: myToken.abi,
    enabled: isValid,
    functionName: 'balanceOf',
    args: [input],
    onSuccess(data: any) {
      if (data === '') {
        setValue(BigNumber.from('0'));
      } else {
        // const withDecimals = data / BigInt(1000000000000000000);

        setValue(BigNumber.from(data));
      }
    },
    onError(error) {
      console.log('ERROR:', error);
    }
  });

  return [value];
}
