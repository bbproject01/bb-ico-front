import React from 'react';

import { Provider } from 'react-redux';

// import { HomeView } from 'views/HomeView';
import store from 'store';
import { Dashboard } from 'views/Dashboard/Dashboard';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};
