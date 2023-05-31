// import { myToken } from 'service/web3Service';
import { useContractRead } from 'wagmi';
// import { useContractReads } from 'wagmi';

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
    address: '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE',
    // abi: myToken.abi,
    enabled: isValid,
    functionName,
    args
  });
  // const { data, error, isLoading, isSuccess, status } = useContractReads({
  //   contracts: [
  //     {
  //       address: '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE',
  //       abi: myToken.abi,
  //       functionName: 'decimals'
  //     },
  //     {
  //       address: '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE',
  //       abi: myToken.abi,
  //       functionName: 'name'
  //     },
  //     {
  //       address: '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE',
  //       abi: myToken.abi,
  //       functionName: 'owner'
  //     },
  //     {
  //       address: '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE',
  //       abi: myToken.abi,
  //       functionName: 'symbol'
  //     },
  //     {
  //       address: '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE',
  //       abi: myToken.abi,
  //       functionName: 'totalSupply'
  //     }
  //   ]
  // });

  return [data, isLoading, isSuccess, status, error];
}
