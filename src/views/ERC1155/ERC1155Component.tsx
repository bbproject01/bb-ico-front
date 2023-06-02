import React from 'react';
// import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { RevisedReturnPeriodComponent } from './RevisedReturnPeriodComponent';
import { ERC20TokenComponent } from './ERC20TokenComponent';
import { TokenIDCounterComponent } from './TokenIDCounterComponent';
import { BalanceOfComponent } from './BalanceOfComponent';
import { FNFTMetadataComponent } from './FNFTMetadataComponent';
import { IsApprovedForAllComponent } from './IsApprovedForAllComponent';
import { UriComponent } from './UriComponent';
import { MintFNFTComponent } from './MintComponent';

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
            <Grid container spacing={3}>
              {/* erc20Token */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <ERC20TokenComponent />
                </Paper>
              </Grid>
              {/* TokenIdCounter */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TokenIDCounterComponent />
                </Paper>
              </Grid>
              {/* balanceOF */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BalanceOfComponent />
                </Paper>
              </Grid>
              {/* FNFTMetadataComponent */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <FNFTMetadataComponent />
                </Paper>
              </Grid>
              {/* IsApprovedForAllComponent */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <IsApprovedForAllComponent />
                </Paper>
              </Grid>
              {/* IsApprovedForAllComponent */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <MintFNFTComponent />
                </Paper>
              </Grid>
              {/* revisedReturnPeriod */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <RevisedReturnPeriodComponent />
                </Paper>
              </Grid>
              {/* Uri */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <UriComponent />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
