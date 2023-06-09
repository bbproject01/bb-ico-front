import React from 'react';
// import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { BalanceOfComponent } from './BalanceOfComponent';
import { MintFNFTComponent } from './MintComponent';
import { TokenIDCounterComponent } from './TokenIDCounterComponent';
import { OwnedTokensComponent } from './OwnedTokensComponent';
import { AllowanceCustomERC20Component } from './AllowanceCustomERC20Component';
import { ApproveCustomERC20Component } from './ApproveCustomERC20Component';
import { ERC20TokenComponent } from './ERC20TokenComponent';
import { SetSecurityTokenComponent } from './SetSecurityTokenComponent';
import { FNFTsOwnedComponent } from './FNFTsOwnedComponent';

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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* ApprovedTokens */}
            <Grid item xs={12} md={12} lg={12}>
              <Grid item xs={6} md={6} lg={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <AllowanceCustomERC20Component />
                </Paper>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Paper
                  sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 2 }}
                >
                  <ApproveCustomERC20Component />
                </Paper>
              </Grid>
            </Grid>
            {/* TokenIdCounter */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 2 }}
              >
                <TokenIDCounterComponent />
              </Paper>
            </Grid>
            <Grid container spacing={3}>
              {/* Mint */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 2 }}
                >
                  <MintFNFTComponent />
                </Paper>
              </Grid>
              {/* balanceOF */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BalanceOfComponent />
                </Paper>
              </Grid>
              {/* IERC20 */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <ERC20TokenComponent />
                </Paper>
              </Grid>
              {/* SET  IERC20 */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <SetSecurityTokenComponent />
                </Paper>
              </Grid>
              {/* List Tokens */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <OwnedTokensComponent />
                </Paper>
              </Grid>
              {/* FNFTsOwned */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <FNFTsOwnedComponent />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
