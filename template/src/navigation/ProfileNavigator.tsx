import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import ProfilePage from '~/screens/ProfilePage/ProfilePage';

const StackNavigator = createStackNavigator<ProfileNavigatorProps>();
const screenOptions = { headerShown: false };

export type ProfileNavigatorProps = {
  ProfilePage: { isProfile: boolean };
};

export type ProfilePageNavProps = StackNavigationProp<
  ProfileNavigatorProps,
  'ProfilePage'
>;

export type ProfilePageRouteProps = RouteProp<
  ProfileNavigatorProps,
  'ProfilePage'
>;

const ProfileNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='ProfilePage'>
      {/* <StackNavigator.Screen name='TestPage' component={TestPage} /> */}
      <StackNavigator.Screen
        name='ProfilePage'
        component={ProfilePage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default ProfileNavigator;
