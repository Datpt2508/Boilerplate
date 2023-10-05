import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import NotificationPage from '~/screens/NotificationPage/NotificationPage';

const StackNavigator = createStackNavigator<NotificationNavigatorProps>();
const screenOptions = { headerShown: false, tabBarHideOnKeyboard: true };

export type NotificationNavigatorProps = {
  NotificationPage: undefined;
};

export type NotificationPageNavProps = StackNavigationProp<
  NotificationNavigatorProps,
  'NotificationPage'
>;
export type NotificationPageRouteProps = RouteProp<
  NotificationNavigatorProps,
  'NotificationPage'
>;

const NotificationNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='NotificationPage'>
      <StackNavigator.Screen
        name='NotificationPage'
        component={NotificationPage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default NotificationNavigator;
