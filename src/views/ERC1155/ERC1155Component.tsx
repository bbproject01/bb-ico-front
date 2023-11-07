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
// import { MintFNFTComponent } from './MintComponent';
import { TokenIDCounterComponent } from './TokenIDCounterComponent';
import { AllowanceCustomERC20Component } from './AllowanceCustomERC20Component';
import { ApproveCustomERC20Component } from './ApproveCustomERC20Component';
// import { ERC20TokenComponent } from './ERC20TokenComponent';
// import { SetSecurityTokenComponent } from './SetSecurityTokenComponent';
// import { FNFTsOwnedComponent } from './FNFTsOwnedComponent';
import { Transfer1155Component } from './Transfer1155Component';
// import { WithDrawComponent } from './WithDrawComponent';
import { BalanceCustomERC20Component } from './BalanceCustomERC20Component';
// import { CreateLockComponent } from './CreateLockComponent';
// import { UnlockComponent } from './UnLockComponent';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

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
            {/* Balance */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 2 }}
              >
                <Tooltip title="Este balance muestra la cantidad de tokens ERC20 disponibles en tu cuenta.">
                  <InfoIcon fontSize="small" />
                </Tooltip>
                <BalanceCustomERC20Component />
              </Paper>
            </Grid>
            {/* ApprovedTokens */}
            <Grid item xs={12} md={12} lg={12}>
              <Grid item xs={6} md={6} lg={6}>
                <Paper
                  sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 2 }}
                >
                  <Tooltip title="Muestra la cantidad de token que el usuario ha brindado a la plataforma como saldo para comprar NFT's. ">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <AllowanceCustomERC20Component />
                </Paper>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Paper
                  sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 2 }}
                >
                  <Tooltip title="Establece una cantidad de tokens (allowance) para la plataforma. Esta asignación indica la cantidad máxima de tokens que la plataforma web puede gastar en NFTF.">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <ApproveCustomERC20Component />
                </Paper>
              </Grid>
            </Grid>
            {/* TokenIdCounter */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 2 }}
              >
                <Tooltip title="Identifica de manera única cada instancia de un token. Puedes utilizar el ID de token para realizar diferentes acciones, como transferir, consultar o interactuar con un token específico">
                  <InfoIcon fontSize="small" />
                </Tooltip>
                <TokenIDCounterComponent />
              </Paper>
            </Grid>
            <Grid container spacing={3}>
              {/* Mint */}
              {/* <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 2 }}
                >
                  <Tooltip title="Crear y emitir nuevos tokens. La función mint permite generar nuevos tokens.">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <MintFNFTComponent />
                </Paper>
              </Grid> */}

              {/* List Tokens */}
              {/* <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Tooltip title="Listado de los tokens FNFT's que un usuario posee.">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <FNFTsOwnedComponent />
                </Paper>
              </Grid> */}
              {/* balanceOF */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Tooltip title="Esta función permite a los desarrolladores y usuarios obtener información sobre la cantidad de un token ERC-1155 que un usuario posee en su dirección.">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <BalanceOfComponent />
                </Paper>
              </Grid>
              {/* Tranfer To */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Tooltip title="Te permite transferir tokens a otra dirección especificada">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <Transfer1155Component />
                </Paper>
              </Grid>
              {/* Create Lock */}
              {/* <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Tooltip title="Te permite crear un bloqueo para tu FNFT (aun sin matematica ni reglas de negocio) ">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <CreateLockComponent />
                </Paper>
              </Grid> */}
              {/* Unlock */}
              {/* <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Tooltip title="Te permite desbloquear tu FNFT (aun sin matematica ni reglas de negocio) ">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <UnlockComponent />
                </Paper>
              </Grid> */}
              {/* WithDrawComponent */}
              {/* <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Tooltip title="Te permite retirar - cangear tu FNFT x ERC20, con el saldo que fue adquirido  (sin matematicas, ni rewards) ">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <WithDrawComponent />
                </Paper>
              </Grid> */}
              {/* IERC20 */}
              {/* <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Tooltip title="Te permite conocer la direccion de tu Security Token">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <ERC20TokenComponent />
                </Paper>
              </Grid> */}
              {/* SET  IERC20 */}
              {/* <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Tooltip title="Te permite cambiar la direccion de tu Security Token">
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                  <SetSecurityTokenComponent />
                </Paper>
              </Grid> */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
