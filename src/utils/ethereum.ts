import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const isValidEthereumAddress = (address: string): boolean => {
  try {
    ethers.utils.getAddress(address);
    return true;
  } catch (error) {
    return false;
  }
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export function formatDate(bigNumberDate: ethers.BigNumber): string {
  // Conversión de BigNumber (segundos) a milisegundos
  const dateInMilliseconds = bigNumberDate.mul(1000).toNumber();

  // Crear el objeto Date
  const date = new Date(dateInMilliseconds);

  // Formatear la fecha
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript comienzan en 0
  const year = date.getFullYear();

  // Devolver la fecha formateada como dd/MM/yyyy
  return `${day < 10 ? '0' : ''}${day}/${
    month < 10 ? '0' : ''
  }${month}/${year}`;
}
