import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAccount } from 'wagmi';

interface IProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: IProps): JSX.Element | null => {
  const { isConnected } = useAccount();

  // console.log('isConnected: ', isConnected);

  return isConnected ? children : <Navigate to="/*" />;
};
