import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../Screens/Profile/ProfileScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack.Navigator>
  );
}

export default function ProfileNavigator() {
  return <MyStack />;
}
