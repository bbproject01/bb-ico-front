import { myToken } from 'service/web3Service';
import { useContractRead } from 'wagmi';

export function useContractReadERC20(
  isValid: boolean,
  functionName: string,
  args: string[]
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
    // address: '0x5080b3ab6a3B5e8893F085B33696d74d1377B5c8',
    address: '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE',
    abi: myToken.abi,
    enabled: isValid,
    functionName,
    args
  });

  return [data, isLoading, isSuccess, status, error];
}
