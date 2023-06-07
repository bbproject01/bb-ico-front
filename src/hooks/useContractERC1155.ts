/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
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

export function useContractERC115(
  isValid: boolean,
  functionName: string,
  parameters: any[]
): [
  result: any | null,
  isLoading: boolean,
  isSuccess: boolean,
  status: string,
  error: Error | null
] {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [isExecuted, setIsExecuted] = useState<boolean>(false); 
  const [calls, setCalls] = useState(0) // Control Renders calls

  useEffect(() => {
    if (isValid) {
      console.log("Setting isValid to false");
      setIsExecuted(false);
    }
  }, [isValid]);

  useEffect(() => {
    const callContractFunction = async () => {
      setIsLoading(true);
      try {
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(FNFT.address, FNFT.abi, signer);

        if (typeof contract[functionName] === 'function') {
          const response = await contract[functionName](...parameters);
          setResult(response);
          setIsSuccess(true);
          setStatus('success');

        } else {
          throw new Error(`La función ${functionName} no existe en el contrato`);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          setStatus('error');
        } else {
          setError(new Error('Se produjo un error desconocido'));
          setStatus('error');
        }
      } finally {
        setIsLoading(false);
        setIsExecuted(true);  
        setCalls(0);
      }
    };

    if (isValid && !isExecuted && calls === 0){
      setCalls((prev)=> prev +1);
      callContractFunction();
    }

  }, [calls, functionName, isExecuted, isValid, parameters]);

  return [result, isLoading, isSuccess, status, error];
}
