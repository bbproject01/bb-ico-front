import { type WriteContractResult } from '@wagmi/core';
import { useEffect } from 'react';
import { myToken } from 'service/web3Service';
import { isValidEthereumAddress } from 'utils/ethereum';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';

export function useTransferFromToken(
  sender: string,
  recipient: string,
  amount: number,
  isValid: boolean
): [
  data: WriteContractResult | undefined,
  isLoading: boolean,
  isSuccess: boolean,
  write: (() => void) | undefined
] {
  // const [isValid, setIsValid] = useState<boolean>(false);

  /**
   * WEB3
   */
  const { config } = usePrepareContractWrite({
    address: '0x5080b3ab6a3B5e8893F085B33696d74d1377B5c8',
    abi: myToken.abi,
    functionName: 'transferFrom',
    args: [sender, recipient, amount],
    enabled: isValid
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  useEffect(() => {
    const callData = (): void => {
      if (
        isValidEthereumAddress(sender) &&
        isValidEthereumAddress(recipient) &&
        amount > 0
      ) {
        // setIsValid(true);
        write?.();
      }
    };

    if (sender !== '') callData();
    if (recipient !== '') callData();
    if (amount > 0) callData();
  }, [sender, recipient, amount, write]);

  return [data, isLoading, isSuccess, write];
}
