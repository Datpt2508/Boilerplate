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
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { SkypeIndicator } from 'react-native-indicators';

import { useTopInset } from '~/hooks/useInset';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';

import AddLocatedScreen from './AddLocatedScreen';
import ListLocatedScreen from './ListLocatedScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LocatedPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal, getParams } = useModalManager();
  const resultContext = usePreferenceContext();
  const isShowList = resultContext?.result?.isDataLocated;
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
      style={{ flex: 1 }}>
      <View style={[{ height: topInsets }]} />

      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}>
          {isShowList ? <ListLocatedScreen /> : <AddLocatedScreen />}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default LocatedPage;

const styles = StyleSheet.create({});
