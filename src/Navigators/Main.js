import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import UserNavigator from './UserNavigator';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
