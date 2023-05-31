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
    address: '0x50b987C93278fef1e273c02B7E300feA469ED246',
    abi: FNFT.abi,
    enabled: isValid,
    functionName,
    args
  });

  return [data, isLoading, isSuccess, status, error];
}
