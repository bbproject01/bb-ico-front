import { type WriteContractResult } from '@wagmi/core';
// import { useEffect } from 'react';
import { myToken } from 'service/web3Service';
// import { isValidEthereumAddress } from 'utils/ethereum';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';

export function useContractWriteCustom(
  isValid: boolean,
  functionName: string,
  args: any[]
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
    functionName,
    args,
    enabled: isValid
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  return [data, isLoading, isSuccess, write];
}
