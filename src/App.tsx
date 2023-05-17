import React from 'react';

// Redux Tool Kit
import store from 'store';
import { Provider } from 'react-redux';

// components

// web3
import { ConnectKitProvider } from 'connectkit';
import { WagmiConfig } from 'wagmi';
import { config } from 'service/web3Service';
import { RouterComponent } from 'routes/RouterComponent';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <RouterComponent />
        </ConnectKitProvider>
      </WagmiConfig>
    </Provider>
  );
};
