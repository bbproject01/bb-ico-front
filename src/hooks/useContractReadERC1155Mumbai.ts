import { FNFT } from 'service/web3Service';
import { useContractRead } from 'wagmi';

export function useContractReadERC1155Mumbai(
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
    ...FNFT,
    enabled: isValid,
    functionName,
    args
  });

  return [data, isLoading, isSuccess, status, error];
}
