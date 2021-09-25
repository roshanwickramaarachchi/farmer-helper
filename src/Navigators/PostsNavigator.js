import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PostsListScreen from '../Screens/Posts/PostsListScreen';
import PostCreteScreen from '../Screens/Posts/PostCreateScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts List"
        component={PostsListScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen name="Post Create" component={PostCreteScreen} />
    </Stack.Navigator>
  );
}

export default function PostsNavigator() {
  return <MyStack />;
}
