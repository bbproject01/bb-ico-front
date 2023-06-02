import { type WriteContractResult } from '@wagmi/core';
// import { useEffect } from 'react';
import { myToken } from 'service/web3Service';
// import { isValidEthereumAddress } from 'utils/ethereum';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

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

  const { data, write } = useContractWrite({
    ...myToken,
    functionName,
    args
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  return [data, isLoading, isSuccess, write];
}
