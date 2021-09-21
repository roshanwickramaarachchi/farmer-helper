import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import PostsNavigator from './PostsNavigator';
import ProfileNavigator from './FrofileNavigator';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Posts Navigator"
      screenOptions={{
        headerShown: false,
        keyboardHidesTabBar: true,
        showLabel: false,
      }}>
      <Tab.Screen
        name="Posts Navigator"
        component={PostsNavigator}
        options={{
          tabBarIcon: () => <Icon name="list-ul" color="orange" size={30} />,
        }}
      />
      <Tab.Screen
        name="Profile Navigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: () => <Icon name="list-ul" color="orange" size={30} />,
        }}
      />
     
    </Tab.Navigator>
  );
}

export default function MainFlowNavigator() {
  return <MyTabs />;
}
