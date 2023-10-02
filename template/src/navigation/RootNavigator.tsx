import { RouteProp } from '@react-navigation/core';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import LoginPage from '~/screens/Authentication/LoginPage';
import SignUpPage from '~/screens/Authentication/SignUpPage';
import AddFriendPage from '~/screens/HomePage/AddFriendPage';
import HomeScreen from '~/screens/HomePage/HomeScreen';
import QrScanScreen from '~/screens/LocatedPage/QrScanScreen';
import OnBoardingPage from '~/screens/OnBoardingPage/OnBoardingPage';
import SelectLanguageOnboardingPage from '~/screens/OnBoardingPage/SelectLanguageOnboardingPage';
import BeLocateOnBoardingStart from '~/screens/OnBoardingPage/components/BeLocateOnBoardingStart';
import LocateOnBoardingStart from '~/screens/OnBoardingPage/components/LocateOnBoardingStart';
import OnBoardView from '~/screens/OnBoardingPage/components/OnBoardView';
import OnBoardingByCode from '~/screens/OnBoardingPage/components/OnBoardingByCode';
import OnBoardingByCodeBeLocated from '~/screens/OnBoardingPage/components/OnBoardingByCodeBeLocated';
import OnBoardingByQr from '~/screens/OnBoardingPage/components/OnBoardingByQr';
import OnBoardingByQrBeLocated from '~/screens/OnBoardingPage/components/OnBoardingByQrBeLocated';
import OnBoardingMap from '~/screens/OnBoardingPage/components/OnBoardingMap';
import PermissionPage from '~/screens/PermissionPage/PermissionPage';
import CreateProfilePage from '~/screens/ProfilePage/CreateProfilePage';
import FeedbackPage from '~/screens/ProfilePage/components/FeedbackPage';
import HowToUsePage from '~/screens/ProfilePage/components/HowToUsePage';
import RateUsPage from '~/screens/ProfilePage/components/RateUsPage';
import SelectLanguagePage from '~/screens/SettingPage/SelectLanguagePage';
import SettingPage from '~/screens/SettingPage/SettingPage';
import ShareCodePage from '~/screens/ShareCodePage';
import SplashPage from '~/screens/SplashPage/SplashPage';
import WebViewPage from '~/screens/WebViewPage';

// import TestPage from '~/screens/TestPage';
import BottomTabNavigator, {
  BottomTabNavigatorProps,
} from './BottomTabNavigator';

export type RootNavigatorProps = {
  navigate(arg0: string): unknown;
  SplashPage: undefined;
  TestPage: undefined;
  BottomTabNavigator: NavigatorScreenParams<BottomTabNavigatorProps>;
  OnBoardingPage: undefined;
  SettingPage: undefined;
  SelectLanguageOnboardingPage: undefined;
  LoginPage: undefined;
  PermissionPage: undefined;
  SignUpPage: undefined;
  OnBoardView: undefined;
  LocateOnBoardingStart: undefined;
  BeLocateOnBoardingStart: undefined;
  OnBoardingMap: undefined;
  OnBoardingByCode: undefined;
  OnBoardingByQr: undefined;
  OnBoardingByQrBeLocated: undefined;
  OnBoardingByCodeBeLocated: undefined;
  CreateProfilePage: undefined;
  EnhancedBottomSheetModal: undefined;
  SelectLanguagePage: undefined;
  HomeScreen: undefined;
  AddFriendPage: { isProfile?: boolean };
  QrScanPage: undefined;
  ShareCodePage: undefined;
  FeedbackPage: undefined;
  RateUsPage: undefined;
  HowToUsePage: undefined;
  WebViewPage: { uri: string };
};

export type RootNavigatorNavProps = StackNavigationProp<RootNavigatorProps>;

export type BottomTabNavigatorNavProps = StackNavigationProp<
  RootNavigatorProps,
  'BottomTabNavigator'
>;

export type BottomTabNavigatorRouteProps = RouteProp<
  RootNavigatorProps,
  'BottomTabNavigator'
>;

const StackNavigator = createStackNavigator<RootNavigatorProps>();
const screenOptions = { headerShown: false };

const RootNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='SplashPage'>
      <StackNavigator.Screen name='SplashPage' component={SplashPage} />
      {/* <StackNavigator.Screen name='TestPage' component={TestPage} /> */}
      <StackNavigator.Screen
        name='BottomTabNavigator'
        component={BottomTabNavigator}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardingPage'
        component={OnBoardingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SelectLanguageOnboardingPage'
        component={SelectLanguageOnboardingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SettingPage'
        component={SettingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='LoginPage'
        component={LoginPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SignUpPage'
        component={SignUpPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardView'
        component={OnBoardView}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='LocateOnBoardingStart'
        component={LocateOnBoardingStart}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='BeLocateOnBoardingStart'
        component={BeLocateOnBoardingStart}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='PermissionPage'
        component={PermissionPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardingMap'
        component={OnBoardingMap}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardingByQr'
        component={OnBoardingByQr}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardingByQrBeLocated'
        component={OnBoardingByQrBeLocated}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardingByCode'
        component={OnBoardingByCode}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardingByCodeBeLocated'
        component={OnBoardingByCodeBeLocated}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='CreateProfilePage'
        component={CreateProfilePage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SelectLanguagePage'
        component={SelectLanguagePage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='AddFriendPage'
        component={AddFriendPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='QrScanPage'
        component={QrScanScreen}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='ShareCodePage'
        component={ShareCodePage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='FeedbackPage'
        component={FeedbackPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='RateUsPage'
        component={RateUsPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='HowToUsePage'
        component={HowToUsePage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='WebViewPage'
        component={WebViewPage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
