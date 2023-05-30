import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { useCustomDispatch, useCustomSelector } from 'hooks/redux';
import {
  setAddressToken,
  // setAddress,
  setDecimals,
  setName,
  setSymbol,
  setTotalSupply
} from 'store/TokenBNB';
import { myToken } from 'service/web3Service';
import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import BalanceOf from './BalanceOf';
import TransferComponent from './TransferComponent';
import AllowanceComponent from './AllowanceComponent';
import ApproveComponent from './ApproveComponent';
import TransferFromComponent from './TransferFromComponent';
import IncreaseAllowanceComponent from './IncreaseAllowanceComponent';
import DecreaseAllowanceComponent from './DecreaseAllowanceComponent';
import MintComponent from './MintComponent';
import BurnComponent from './BurnComponent';
import BurnFromComponent from './BurnFromComponent';
import MaxSupplyComponent from './MaxSupplyComponent';

const mdTheme = createTheme();

export const ERC20Component: React.FC = () => {
  const [isLoadingComponent, setIsLoadingComponent] = useState<boolean>(true);
  const { isConnected } = useAccount();
  // const [balanceOf, setBalanceOf] = useState<string>('');
  //   const [open, setOpen] = useState(true);
  //   const toggleDrawer = (): void => {
  //     setOpen(!open);
  //   };
  const {
    tokenBNB: { addressToken, name, symbol, decimals, totalSupply }
  } = useCustomSelector((state) => state);
  //   const { disconnect } = useDisconnect();

  const dispatch = useCustomDispatch();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        setIsLoadingComponent(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          myToken.address,
          myToken.abi,
          signer
        );

        const tempName = await contract.name();
        const tempSymbol = await contract.symbol();
        const tempDecimals = await contract.decimals();
        const tempTotalSupply = await contract.totalSupply();

        dispatch(setName(tempName.toString()));
        dispatch(setSymbol(tempSymbol.toString()));
        dispatch(setDecimals(tempDecimals.toString()));
        dispatch(setTotalSupply(tempTotalSupply.toString()));
        dispatch(setAddressToken(myToken.address));
        setIsLoadingComponent(false);
      } catch (error) {
        console.error(error);
        setIsLoadingComponent(false);
      }
    };

    getData();
  }, [dispatch, name, symbol, decimals, totalSupply, addressToken]);

  //   const handleDisconect = (): void => {
  //     disconnect();
  //   };

  if (!isConnected) {
    return <Navigate to="/*" />;
  }

  return isLoadingComponent ? (
    <Box
      sx={{
        height: window.innerHeight,
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
  ) : (
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
              {/* Recent Deposits */}
              <Grid item xs={12} md={6} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Chart */}
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
              {/* disableMaxSupply */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <MaxSupplyComponent />
                </Paper>
              </Grid>
              {/* enableMaxSupply */}
              {/* Balance Of */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BalanceOf />
                </Paper>
              </Grid>
              {/* transfer */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TransferComponent />
                </Paper>
              </Grid>
              {/* allowance */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <AllowanceComponent />
                </Paper>
              </Grid>
              {/* approve */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <ApproveComponent />
                </Paper>
              </Grid>
              {/* transferFrom */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TransferFromComponent />
                </Paper>
              </Grid>
              {/* increaseAllowance */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <IncreaseAllowanceComponent />
                </Paper>
              </Grid>
              {/* decreaseAllowance */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <DecreaseAllowanceComponent />
                </Paper>
              </Grid>
              {/* mint */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <MintComponent />
                </Paper>
              </Grid>
              {/* burn */}
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
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
