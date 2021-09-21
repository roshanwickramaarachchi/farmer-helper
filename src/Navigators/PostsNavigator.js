import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PostsListScreen from '../Screens/Posts/PostsListScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts List"
        component={PostsListScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function PostsNavigator() {
  return <MyStack />;
}
