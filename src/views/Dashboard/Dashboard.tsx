import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import { ethers, getDefaultProvider } from 'ethers';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps
} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavBarComponents } from './listItems';
import { useCustomSelector } from 'hooks/redux';
// import {
//   setAddressToken,
//   // setAddress,
//   setDecimals,
//   setName,
//   setSymbol,
//   setTotalSupply
// } from 'store/TokenBNB';
// import { myToken } from 'service/web3Service';
import { useAccount, useDisconnect } from 'wagmi';
import { Navigate } from 'react-router-dom';
// import { CircularProgress } from '@mui/material';
import { ERC20Component } from './ERC20Component';
import { ERC1155Component } from 'views/ERC1155/ERC1155Component';

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
  // const [isLoadingComponent, setIsLoadingComponent] = useState<boolean>(true);
  const { isConnected } = useAccount();
  const [bodyComponent, setBodyComponent] = useState<JSX.Element>(
    <Typography>Home</Typography>
  );
  const [open, setOpen] = useState(true);
  const toggleDrawer = (): void => {
    setOpen(!open);
  };
  const {
    // tokenBNB: { addressToken, name, symbol, decimals, totalSupply },
    dashboard: { selectedMenuOption }
  } = useCustomSelector((state) => state);
  const { disconnect } = useDisconnect();

  // const dispatch = useCustomDispatch();

  // useEffect(() => {
  //   const getData = async (): Promise<void> => {
  //     try {
  //       setIsLoadingComponent(true);
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(
  //         myToken.address,
  //         myToken.abi,
  //         signer
  //       );

  //       const tempName = await contract.name();
  //       const tempSymbol = await contract.symbol();
  //       const tempDecimals = await contract.decimals();
  //       const tempTotalSupply = await contract.totalSupply();

  //       dispatch(setName(tempName.toString()));
  //       dispatch(setSymbol(tempSymbol.toString()));
  //       dispatch(setDecimals(tempDecimals.toString()));
  //       dispatch(setTotalSupply(tempTotalSupply.toString()));
  //       dispatch(setAddressToken(myToken.address));
  //       setIsLoadingComponent(false);
  //     } catch (error) {
  //       console.error(error);
  //       setIsLoadingComponent(false);
  //     }
  //   };

  //   getData();
  // }, [dispatch, name, symbol, decimals, totalSupply, addressToken]);

  useEffect(() => {
    switch (selectedMenuOption) {
      case 1:
        setBodyComponent(<ERC20Component />);
        break;
      case 2:
        setBodyComponent(<ERC1155Component />);
        break;
      default:
        setBodyComponent(<Typography>Home</Typography>);
        break;
    }
  }, [selectedMenuOption]);

  const handleDisconect = (): void => {
    disconnect();
  };

  if (!isConnected) {
    return <Navigate to="/*" />;
  }

  return (
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
              Home
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
          <NavBarComponents />
        </Drawer>
        {bodyComponent}
      </Box>
    </ThemeProvider>
  );
};

export const Dashboard: React.FC = () => {
  return <DashboardContent />;
};
