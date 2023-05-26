import { Box, CircularProgress } from '@mui/material';
import * as React from 'react';

const CircularProgressBarBox = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CircularProgressBarBox;
