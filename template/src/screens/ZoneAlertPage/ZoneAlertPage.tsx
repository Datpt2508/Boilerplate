import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  // RouteProp,
  useFocusEffect,
  useNavigation, // useRoute,
} from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { SkypeIndicator } from 'react-native-indicators';
import {
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

import { useTopInset } from '~/hooks/useInset';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import HeaderHome from '~/screens/HomePage/HeaderHome';

import ButtonCustom from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { ZoneAlertPageNavProps } from '~/navigation/ZoneAlertNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ZoneAlertPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<ZoneAlertPageNavProps>();
  const { openModal, getParams } = useModalManager();
  const actionMethod = usePreferenceActionsContext();
  const topInsets = useTopInset();

  // const { isClosed, load } = useInterstitialAd(GoogleAdsIds.INTERSTITIAL, {
  //   requestNonPersonalizedAdsOnly: true,
  // });

  // useEffect(() => {
  //   load();
  // }, [isClosed, load]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <ImageBackground
      source={getImage('imageBackgroundApp')}
      resizeMode='cover'
      style={{ flex: 1, paddingTop: topInsets }}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
        <Text
          style={{
            color: '#0057E7',
            fontWeight: '700',
            fontSize: 24,
            fontFamily: 'SFProDisplay-Medium',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          {t('Zone Alert')}
        </Text>
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              height: 150,
              alignItems: 'center',
              marginTop: 150,
            }}>
            <Image
              source={getImage('noZoneAlert')}
              resizeMode='contain'
              style={{ height: '100%', width: '100%' }}
            />
          </View>
        </ScrollView>
        <ButtonCustom
          style={{
            marginBottom: 32,
            width: SCREEN_WIDTH * 0.7,
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate('AddZonePage')}
          title={t('Add Zone Alert')}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default ZoneAlertPage;

const styles = StyleSheet.create({});
