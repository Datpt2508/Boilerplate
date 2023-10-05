import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import SettingPage from '~/screens/SettingPage/SettingPage';

const StackNavigator = createStackNavigator<ProfileNavigatorProps>();
const screenOptions = { headerShown: false };

export type ProfileNavigatorProps = {
  SettingPage: { isProfile: boolean };
};

export type SettingPageNavProps = StackNavigationProp<
  ProfileNavigatorProps,
  'SettingPage'
>;

export type SettingPageRouteProps = RouteProp<
  ProfileNavigatorProps,
  'SettingPage'
>;

const ProfileNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='SettingPage'>
      <StackNavigator.Screen
        name='SettingPage'
        component={SettingPage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default ProfileNavigator;
