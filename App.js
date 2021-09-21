import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {navigationRef} from './src/Navigators/RootNavigation';

// Navigatiors
import Main from './src/Navigators/Main';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
