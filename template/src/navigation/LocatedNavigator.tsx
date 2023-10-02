import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import LocatedPage from '~/screens/LocatedPage/LocatedPage';

const StackNavigator = createStackNavigator<LocatedNavigatorProps>();
const screenOptions = { headerShown: false, tabBarHideOnKeyboard: true };

export type LocatedNavigatorProps = {
  LocatedPage: undefined;
};

export type LocatedPageNavProps = StackNavigationProp<
  LocatedNavigatorProps,
  'LocatedPage'
>;
export type LocatedPageRouteProps = RouteProp<
  LocatedNavigatorProps,
  'LocatedPage'
>;

const LocatedNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='LocatedPage'>
      <StackNavigator.Screen
        name='LocatedPage'
        component={LocatedPage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default LocatedNavigator;
