import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PostsListScreen from '../Screens/Posts/PostsListScreen';
import PostCreteScreen from '../Screens/Posts/PostCreateScreen';
import PostEditScreen from '../Screens/Posts/PostEditScreen';

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
      <Stack.Screen name="Post Edit" component={PostEditScreen} />
    </Stack.Navigator>
  );
}

export default function PostsNavigator() {
  return <MyStack />;
}
