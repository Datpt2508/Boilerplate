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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import {
  BannerAd,
  BannerAdSize, // useInterstitialAd,
  GAMBannerAd,
} from 'react-native-google-mobile-ads';

import { useBottomInset } from '~/hooks/useInset';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import IconLocated from '~/resources/Icons/IconBottomBar/IconLocated';
import IconLocatedActive from '~/resources/Icons/IconBottomBar/IconLocatedActive';
import IconLocator from '~/resources/Icons/IconBottomBar/IconLocator';
import IconLocatorActive from '~/resources/Icons/IconBottomBar/IconLocatorActive';
import IconProfile from '~/resources/Icons/IconBottomBar/IconProfile';
import IconProfileActive from '~/resources/Icons/IconBottomBar/IconProfileActive';
import IconZoneAlert from '~/resources/Icons/IconBottomBar/IconZoneAlert';
import IconZoneAlertActive from '~/resources/Icons/IconBottomBar/IconZoneAlertActive';
import { useAppTheme } from '~/resources/theme';

import { ANDROID_BANNER, IOS_BANNER } from '@env';
import TextGradient from '~/base/TextGradient';

import HomeNavigator, { HomeNavigatorProps } from './HomeNavigator';
import LocatedNavigator, { LocatedNavigatorProps } from './LocatedNavigator';
import ProfileNavigator, { ProfileNavigatorProps } from './ProfileNavigator';
import { RootNavigatorProps } from './RootNavigator';
import ZoneAlertNavigator, {
  ZoneAlertNavigatorProps,
} from './ZoneAlertNavigator';

export type BottomTabNavigatorProps = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorProps> | undefined;
  ProfileNavigator: NavigatorScreenParams<ProfileNavigatorProps> | undefined;
  LocatedNavigator: NavigatorScreenParams<LocatedNavigatorProps> | undefined;
  ZoneAlertNavigator:
    | NavigatorScreenParams<ZoneAlertNavigatorProps>
    | undefined;
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

export type ProfileNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'ProfileNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type ProfileNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'ProfileNavigator'
>;

export type LocatedNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'LocatedNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type LocatedNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'LocatedNavigator'
>;

const ID_ADS_BANNER = Platform?.OS === 'ios' ? IOS_BANNER : ANDROID_BANNER;

const BottomTabNavigator = (): JSX.Element => {
  const theme = useAppTheme();
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();
  const bottomInset = useBottomInset();
  const adsMobState = usePreferenceContext()?.result?.adsMobState;

  const [isLoadingAds, setIsLoadingAds] = useState(false);
  const isRemoteBannerAds = adsMobState?.Banner;

  return (
    <View style={{ flex: 1 }}>
      {isRemoteBannerAds && (
        <View style={{ position: 'absolute', zIndex: -22 }}>
          <GAMBannerAd
            sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdFailedToLoad={() => setIsLoadingAds(false)}
            onAdLoaded={() => setIsLoadingAds(true)}
            unitId={ID_ADS_BANNER}
          />
        </View>
      )}

      <Tab.Navigator
        // tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.backgroundColor,
            borderTopColor: '#9E9E9E',
            borderTopWidth: 1,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            // paddingBottom: Platform.OS === 'ios' ? bottomInset : 8,
            // height: Platform.OS === 'android' ? 60 : bottomInset + 44,
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
                <IconLocatorActive color={theme.colors.iconActive} />
              ) : (
                <IconLocator />
              ),
          }}
        />

        <Tab.Screen
          name='LocatedNavigator'
          component={LocatedNavigator}
          options={{
            tabBarLabel: t('Be Located'),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <IconLocatedActive color={theme.colors.iconActive} />
              ) : (
                <IconLocated />
              ),
          }}
        />

        {/* <Tab.Screen
        name='ZoneAlertNavigator'
        component={ZoneAlertNavigator}
        options={{
          tabBarLabel: t('Zone Alert'),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <IconZoneAlertActive color={theme.colors.iconActive} />
            ) : (
              <IconZoneAlert />
            ),
        }}
      /> */}

        <Tab.Screen
          name='ProfileNavigator'
          component={ProfileNavigator}
          options={{
            tabBarLabel: t('Profile'),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <IconProfileActive color={theme.colors.iconActive} />
              ) : (
                <IconProfile />
              ),
          }}
        />
      </Tab.Navigator>
      {isRemoteBannerAds && isLoadingAds && (
        <View style={{ flexShrink: 1 }}>
          <GAMBannerAd
            sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdFailedToLoad={() => setIsLoadingAds(false)}
            unitId={ID_ADS_BANNER}
            // unitId={'ca-app-pub-4584260126367940/2456605588'}
          />
        </View>
      )}
    </View>
  );
};

export default BottomTabNavigator;
