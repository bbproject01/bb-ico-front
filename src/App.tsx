import React from 'react';

// Redux Tool Kit
// import store, { persistor } from 'store/store';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';

// components
// import { DisclaimerCustom } from './components/disclaimer/disclaimerCustom';

// web3
// import { ConnectKitProvider } from 'connectkit';
// import { WagmiConfig } from 'wagmi';
// import { client } from 'service/web3Service';
import { HomeView } from 'views/HomeView';

// routes
// import { RouterComponent } from './routes/RouterComponent';

const App: React.FC = () => {
  return (
    <HomeView />
  );
};

export default App;
