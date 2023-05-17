import React, { useEffect } from 'react';
import { ConnectKitButton } from 'connectkit';
import {
  Box
  // Container,
  // FormControl,
  // Grid,
  // Link,
  // TextField,
  // Typography
} from '@mui/material';
// import { ButtonWalletCustom } from 'components/button/ButtonWalletCustom';

export const EnrollmentLayout: React.FC = () => {
  useEffect(() => {
    document.querySelector('body')?.removeAttribute('class');
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: window.innerWidth,
        height: window.innerHeight
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 300,
          p: 2,
          border: '1px solid grey',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ConnectKitButton />
      </Box>
    </Box>
  );
};
