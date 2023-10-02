import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import AddZonePage from '~/screens/ZoneAlertPage/AddZonePage';
import ZoneAlertPage from '~/screens/ZoneAlertPage/ZoneAlertPage';

const StackNavigator = createStackNavigator<ZoneAlertNavigatorProps>();
const screenOptions = { headerShown: false };

export type ZoneAlertNavigatorProps = {
  ZoneAlertPage: undefined;
  AddZonePage: undefined;
};

export type ZoneAlertPageNavProps = StackNavigationProp<
  ZoneAlertNavigatorProps,
  'ZoneAlertPage'
>;

export type ZoneAlertPageRouteProps = RouteProp<
  ZoneAlertNavigatorProps,
  'ZoneAlertPage'
>;

const ZoneAlertNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='ZoneAlertPage'>
      {/* <StackNavigator.Screen name='TestPage' component={TestPage} /> */}
      <StackNavigator.Screen
        name='ZoneAlertPage'
        component={ZoneAlertPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='AddZonePage'
        component={AddZonePage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default ZoneAlertNavigator;
