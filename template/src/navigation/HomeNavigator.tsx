import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import HomePage from '~/screens/HomePage/HomePage';

const StackNavigator = createStackNavigator<HomeNavigatorProps>();
const screenOptions = { headerShown: false };

export type HomeNavigatorProps = {
  HomePage: undefined;
  FriendTrackingPage: { friendData: any; listFriend: any };
};

export type HomePageNavProps = StackNavigationProp<
  HomeNavigatorProps,
  'HomePage'
>;
export type HomePageRouteProps = RouteProp<HomeNavigatorProps, 'HomePage'>;

const HomeNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='HomePage'>
      <StackNavigator.Screen
        name='HomePage'
        component={HomePage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeNavigator;
