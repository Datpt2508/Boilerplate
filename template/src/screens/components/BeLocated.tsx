import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useInterstitialAd } from 'react-native-google-mobile-ads';

import getImage from '~/libs/getImage';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';

import Located from '../LocatedPage/LocatedItem';

const BeLocated = (): JSX.Element => {
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { t } = useTranslation();
  const data = [
    {
      name: 'Tran Ngoc',
      country: 'bac giang, viet nam',
      timeConnected: 'Connected on 8 august 2023',
      img: 'https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg',
    },
    {
      name: 'John Wick',
      country: 'Bac Kan, viet nam',
      timeConnected: 'Connected on 10 august 2023',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-qrebAKYW2cebWNnDJvAqy6_nOROw02kZDhx5Nq0&s',
    },
  ];

  const { isClosed, load } = useInterstitialAd(GoogleAdsIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    load();
  }, [isClosed, load]);

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
    <ImageBackground source={getImage('backgroundProfile')} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingLeft: 24,
          paddingRight: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            position: 'absolute',
            backgroundColor: 'rgba(0, 87, 231, 1)',
            borderRadius: 4,
            bottom: 50,
            alignItems: 'center',
            paddingVertical: 12,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: 18,
              lineHeight: 32,
            }}>
            {t('Add Locator')}
          </Text>
        </View>
        <ScrollView
          bounces={false}
          style={{
            flex: 1,
            paddingHorizontal: 16,
            width: '100%',
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.head}>
              <Text
                style={{
                  color: 'rgba(0, 87, 231, 1)',
                  fontSize: 24,
                  fontWeight: '700',
                  paddingBottom: 20,
                }}>
                {t('Be Located')}
              </Text>
            </View>
            {data.map((item) => (
              <View style={{ width: '100%', paddingBottom: 12 }}>
                <Located data={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default BeLocated;

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    paddingVertical: 12,
  },
});
