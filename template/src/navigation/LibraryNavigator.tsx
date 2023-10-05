import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import LibraryPage from '~/screens/LibraryPage/LibraryPage';

const StackNavigator = createStackNavigator<LibraryNavigatorProps>();
const screenOptions = { headerShown: false };

export type LibraryNavigatorProps = {
  LibraryPage: undefined;
};

export type LibraryPageNavProps = StackNavigationProp<
  LibraryNavigatorProps,
  'LibraryPage'
>;

export type LibraryPageRouteProps = RouteProp<
  LibraryNavigatorProps,
  'LibraryPage'
>;

const LibraryNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='LibraryPage'>
      <StackNavigator.Screen
        name='LibraryPage'
        component={LibraryPage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default LibraryNavigator;
