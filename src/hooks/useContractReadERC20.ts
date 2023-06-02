import { myToken } from 'service/web3Service';
import { useContractRead } from 'wagmi';

export function useContractReadERC20(
  isValid: boolean,
  functionName: string,
  args: any[]
): [
  data: any | undefined,
  isLoading: boolean,
  isSuccess: boolean,
  write: string,
  error: Error | null
] {
  /**
   * WEB3
   */
  // node ENS
  const { data, error, isLoading, isSuccess, status } = useContractRead({
    ...myToken,
    enabled: isValid,
    functionName,
    args
  });

  return [data, isLoading, isSuccess, status, error];
}
