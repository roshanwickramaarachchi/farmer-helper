import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginFlowNavigator from './LoginFlowNavigator';
import MainFlowNavigator from './MailFlowNavigator';
import SplashScreen from '../Screens/SplashScreen.js/SplashScreen';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login Flow"
        component={LoginFlowNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Main Flow"
        component={MainFlowNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
