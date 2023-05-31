import { myToken } from 'service/web3Service';
import { useContractRead } from 'wagmi';

export function useContractReadERC20Mumbai(
  isValid: boolean,
  functionName: string,
  args: any[]
): [
  data: any | undefined,
  isLoading: boolean,
  isSuccess: boolean,
  status: string,
  error: Error | null
] {
  /**
   * WEB3
   */
  // node ENS
  const { data, error, isLoading, isSuccess, status } = useContractRead({
    address: '0x62ba02826ef23F4ce9Ac11B72CB31Aadb85878F9',
    abi: myToken.abi,
    enabled: isValid,
    functionName,
    args
  });

  return [data, isLoading, isSuccess, status, error];
}
