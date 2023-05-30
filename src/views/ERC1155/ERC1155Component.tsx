import React from 'react';
// import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Title from 'components/Title/Title';

const mdTheme = createTheme();

export const ERC1155Component: React.FC = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* disableMaxSupply */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Title title={'ERC1155'}></Title>
                <Typography sx={{ mt: 2 }}>ERC1155</Typography>
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
