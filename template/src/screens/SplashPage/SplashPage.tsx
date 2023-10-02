import AsyncStorage from '@react-native-async-storage/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { SkypeIndicator } from 'react-native-indicators';

import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';

import IconLogo from '~/resources/Icons/IconLogo';
import { useAppTheme } from '~/resources/theme';

import { ANDROID_INTER_SPLASH, IOS_INTER_SPLASH } from '@env';
import i18n from 'i18next';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const ID_ADS_INTER_SPLASH =
  Platform?.OS === 'ios' ? IOS_INTER_SPLASH : ANDROID_INTER_SPLASH;

const SplashPage = (): JSX.Element => {
  const navigation = useNavigation<RootNavigatorNavProps>();
  const theme = useAppTheme();
  const { t } = useTranslation();
  const actionMethod = usePreferenceActionsContext();

  const [isRemoteSplashAds, setIsRemoteSplashAds] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    ID_ADS_INTER_SPLASH,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    // AsyncStorage.removeItem('isFirstOpen');
    // AsyncStorage.setItem('isFirstOpen', 'true');

    const loadPurchase = async () => {
      const isFirstState = Boolean(await AsyncStorage.getItem('isFirstOpen'));
      console.log(
        '🚀 ~ file: SplashPage.tsx:57 ~ loadPurchase ~ isFirstState:',
        isFirstState,
      );
      setIsFirst(isFirstState);
    };
    loadPurchase();
  }, []);

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: theme.colors.backgroundColor,
      },
      styles.viewContainer,
    ],
    [theme],
  );

  const styleAppName = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.black,
        marginTop: 40,
        fontWeight: '700',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 20,
        textAlign: 'center',
      },
    ],
    [theme],
  );

  useEffect(() => {
    const fetchAdsMob = async () => {
      await remoteConfig().setDefaults({
        Native_tutorial: 'disabled',
        Native_language: 'disabled',
        Inter_home: 'disabled',
        Inter_splash: 'disabled',
        Native_tutorial_detail: 'disabled',
        Native_profile: 'disabled',
        App_open_resume: 'disabled',
        Banner: 'disabled',
        Native_home: 'disabled',
        Inter_locate: 'disabled',
      });

      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 1000,
      });

      try {
        await remoteConfig().fetchAndActivate();

        const Inter_splash = remoteConfig().getBoolean('Inter_splash');
        setIsRemoteSplashAds(Inter_splash);

        const configKeys = [
          'Native_tutorial',
          'Native_language',
          'Inter_home',
          'Inter_splash',
          'Native_tutorial_detail',
          'Native_profile',
          'App_open_resume',
          'Banner',
          'Native_home',
          'Inter_locate',
        ];

        const remoteConfigData = {};

        configKeys.forEach((key) => {
          remoteConfigData[key] = remoteConfig().getBoolean(key);
        });

        actionMethod?.setStateAdsMob?.(remoteConfigData);
      } catch (error) {
        console.error('Error fetching remote config:', error);
      }
    };

    fetchAdsMob();
  }, []);

  useEffect(() => {
    const getDeviceUUID = async () => {
      try {
        let uuid = null;
        if (Platform.OS === 'android') {
          uuid = await DeviceInfo.getAndroidId();
        } else {
          uuid = await DeviceInfo.getUniqueId();
        }
        actionMethod?.setActionDeviceUUID?.(uuid);
        actionMethod?.setActionIsDataLocated?.(uuid);
      } catch (error) {
        console.error('Error getting device UUID:', error);
      }
    };

    getDeviceUUID();
  }, []);

  useEffect(() => {
    const loadLanguage = async () => {
      const language = await AsyncStorage.getItem('languageApp');
      if (language) {
        i18n.changeLanguage(language);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isFirst) {
        // if (isRemoteSplashAds && isLoaded) {
        //   show();
        // } else {
        navigation.navigate('SelectLanguageOnboardingPage');
        // }
      } else {
        if (isRemoteSplashAds && isLoaded) {
          show();
        } else {
          navigation.navigate('BottomTabNavigator', {
            screen: 'HomeNavigator',
          });
        }
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [isLoaded, show, navigation]);

  useEffect(() => {
    if (isClosed) {
      if (!isFirst) {
        navigation.navigate('SelectLanguageOnboardingPage');
      } else {
        navigation.navigate('BottomTabNavigator', {
          screen: 'HomeNavigator',
        });
      }
    }
  }, [isClosed, navigation]);

  return (
    <View style={styleContainer}>
      <StatusBar translucent backgroundColor='transparent' />
      <View style={styles.viewLogo}>
        <IconLogo height={100} width={100} />
        <Text style={styleAppName}>
          {t(`Sharing location safety to \n your loved ones`)}
        </Text>
      </View>
      <View style={styles.loading}>
        <SkypeIndicator color={'#0057E7'} size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLogo: { justifyContent: 'center', alignItems: 'center' },
  loading: { position: 'absolute', bottom: 100 },
});

export default SplashPage;
