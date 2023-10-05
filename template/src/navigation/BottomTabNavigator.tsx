import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';

import { useBottomInset } from '~/hooks/useInset';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconHome from '~/resources/Icons/IconBottomBar/IconHome';
import IconLocated from '~/resources/Icons/IconBottomBar/IconLocated';
import IconMusic from '~/resources/Icons/IconBottomBar/IconMusic';
import IconProfile from '~/resources/Icons/IconBottomBar/IconProfile';
import { useAppTheme } from '~/resources/theme';

import { ANDROID_BANNER, IOS_BANNER } from '@env';
import TextGradient from '~/base/TextGradient';

import HomeNavigator, { HomeNavigatorProps } from './HomeNavigator';
import LibraryNavigator, { LibraryNavigatorProps } from './LibraryNavigator';
import NotificationNavigator, {
  NotificationNavigatorProps,
} from './NotificationNavigator';
import ProfileNavigator, { ProfileNavigatorProps } from './ProfileNavigator';
import { RootNavigatorProps } from './RootNavigator';

export type BottomTabNavigatorProps = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorProps> | undefined;
  LibraryNavigator: NavigatorScreenParams<LibraryNavigatorProps> | undefined;
  NotificationNavigator:
    | NavigatorScreenParams<NotificationNavigatorProps>
    | undefined;
  ProfileNavigator: NavigatorScreenParams<ProfileNavigatorProps> | undefined;
};

export type BottomTabNavigatorRouteProps = RouteProp<BottomTabNavigatorProps>;

export type BottomTabNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps>,
  StackNavigationProp<RootNavigatorProps>
>;

export type HomeNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'HomeNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type HomeNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'HomeNavigator'
>;

export type LibraryNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'LibraryNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type LibraryNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'LibraryNavigator'
>;

export type ProfileNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'ProfileNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type ProfileNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'ProfileNavigator'
>;

export type NotificationNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'NotificationNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type NotificationNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'NotificationNavigator'
>;

const ID_ADS_BANNER = Platform?.OS === 'ios' ? IOS_BANNER : ANDROID_BANNER;

const BottomTabNavigator = (): JSX.Element => {
  const theme = useAppTheme();
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();
  const bottomInset = useBottomInset();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        // tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.backgroundColor,
            borderTopColor: '#9E9E9E',
            borderTopWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            // height: 60,
            // paddingBottom: 10,
            paddingBottom: Platform.OS === 'ios' ? 24 : 10,
            height: Platform.OS === 'android' ? 60 : bottomInset + 44,
          },
          tabBarActiveTintColor: theme.colors.titleActive,
          tabBarInactiveTintColor: theme.colors.title,
        }}>
        <Tab.Screen
          name='HomeNavigator'
          component={HomeNavigator}
          options={{
            tabBarLabel: t('Locator'),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <LottieView
                  source={getImage('homeAnimate')}
                  autoPlay
                  loop
                  style={{ height: 40, width: 40 }}
                />
              ) : (
                <IconHome />
              ),
          }}
        />

        <Tab.Screen
          name='LibraryNavigator'
          component={LibraryNavigator}
          options={{
            tabBarLabel: t('Library'),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <LottieView
                  source={getImage('moon')}
                  autoPlay
                  loop
                  style={{ height: 30, width: 30 }}
                />
              ) : (
                <IconLocated />
              ),
          }}
        />

        <Tab.Screen
          name='NotificationNavigator'
          component={NotificationNavigator}
          options={{
            tabBarLabel: t('Notification'),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <LottieView
                  source={getImage('moon2')}
                  autoPlay
                  // loop
                  style={{ height: 32, width: 32 }}
                />
              ) : (
                <IconMusic />
              ),
          }}
        />

        <Tab.Screen
          name='ProfileNavigator'
          component={ProfileNavigator}
          options={{
            tabBarLabel: t('Profile'),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <LottieView
                  source={getImage('profile')}
                  autoPlay
                  loop
                  style={{ height: 30, width: 30 }}
                />
              ) : (
                <IconProfile />
              ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
