import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
// import { ethers, getDefaultProvider } from 'ethers';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps
} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
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
import { useAccount, useDisconnect } from 'wagmi';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import BalanceOf from './BalanceOf';
import TransferComponent from './TransferComponent';
import AllowanceComponent from './AllowanceComponent';
import ApproveComponent from './ApproveComponent';
import TransferFromComponent from './TransferFromComponent';
import IncreaseAllowanceComponent from './IncreaseAllowanceComponent';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!(open ?? false) && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const mdTheme = createTheme();

const DashboardContent: React.FC = () => {
  const [isLoadingComponent, setIsLoadingComponent] = useState<boolean>(true);
  const { isConnected } = useAccount();
  // const [balanceOf, setBalanceOf] = useState<string>('');
  const [open, setOpen] = useState(true);
  const toggleDrawer = (): void => {
    setOpen(!open);
  };
  const {
    tokenBNB: { addressToken, name, symbol, decimals, totalSupply }
  } = useCustomSelector((state) => state);
  const { disconnect } = useDisconnect();

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

  const handleDisconect = (): void => {
    disconnect();
  };

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
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px' // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleDisconect}>
              <Typography> Logout </Typography>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
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
              {/* mint */}
              {/* burn */}
              {/* burnFrom */}
              {/* disableMaxSupply */}
              {/* enableMaxSupply */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export const Dashboard: React.FC = () => {
  return <DashboardContent />;
};
