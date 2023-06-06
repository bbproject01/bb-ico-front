import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';
import Deposits from './Deposits';
import BalanceOfComponent from './BalanceOfComponent';
import AllowanceComponent from './AllowanceComponent';
import ApproveComponent from './ApproveComponent';
import BurnComponent from './BurnComponent';
import BurnFromComponent from './BurnFromComponent';
import DecreaseAllowanceComponent from './DecreaseAllowanceComponent';
import IncreaseAllowanceComponent from './IncreaseAllowanceComponent';

const mdTheme = createTheme();

export const ERC20EthersComponent: React.FC = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to="/*" />;
  }

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
              {/* Balance Of */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Deposits />
                </Paper>
              </Grid>
              {/* Balance Of Component */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BalanceOfComponent />
                </Paper>
              </Grid>
              {/* AllowanceComponent */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <AllowanceComponent />
                </Paper>
              </Grid>
              {/* ApproveComponent */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <ApproveComponent />
                </Paper>
              </Grid>
              {/* BurnComponent */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BurnComponent />
                </Paper>
              </Grid>
              {/* burnFrom */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BurnFromComponent />
                </Paper>
              </Grid>
              {/* decreaseAllowance */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <DecreaseAllowanceComponent />
                </Paper>
              </Grid>
              {/* increaseAllowance */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <IncreaseAllowanceComponent />
                </Paper>
              </Grid>
              {/* MaxSupplyDisabledComponent */}
              {/* MaxSupplyEnabledComponent */}
              {/* mint */}
              {/* transfer */}
              {/* transferFrom */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
