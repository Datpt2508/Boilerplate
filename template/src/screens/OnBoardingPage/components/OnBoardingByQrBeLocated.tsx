import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTopInset } from '~/hooks/useInset';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/IconBack';
import { useAppTheme } from '~/resources/theme';

import NativeAdsOnboardingDetail from '~/screens/components/NativeADS/NativeAdsOnboardingDetail';

import CustomButton from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const OnBoardingByQrBeLocated = () => {
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const topInsets = useTopInset();
  const { t } = useTranslation();
  const adsMobState = usePreferenceContext()?.result?.adsMobState;
  const [loadAds, setLoadAds] = useState(true);
  const isRemoteNativeAds = adsMobState?.Native_tutorial_detail;

  const styleText = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.black,
        fontWeight: '700',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 20,
        lineHeight: 32,
      },
    ],
    [theme],
  );

  const handleLoadAds = (item: boolean) => {
    setLoadAds(item);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getImage('imageBackgroundApp')}
        resizeMode='cover'
        style={{ flex: 1, paddingTop: topInsets }}>
        <View
          style={{
            height: 50,
            // justifyContent: 'center',
            paddingHorizontal: 16,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack width={32} height={32} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              // flex: 1,
              paddingHorizontal: 24,
            }}>
            <View style={{ marginLeft: 8, marginRight: 12 }}>
              <Text style={styleText}>
                {t(
                  `Ask your loved one to send you the code on their 'Locator' page`,
                )}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 32,
                height: SCREEN_HEIGHT * 0.6,
              }}>
              <Image
                resizeMode='contain'
                source={getImage(
                  Platform.OS === 'ios'
                    ? 'imageOnboarding4'
                    : 'imageOnboardingAndroid2',
                )}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.2,
              paddingHorizontal: 24,
              justifyContent: 'center',
            }}>
            <CustomButton
              onPress={() => navigation.navigate('OnBoardingByCodeBeLocated')}
              title={t('Next')}
            />
          </View>
        </ScrollView>
        {loadAds && isRemoteNativeAds && (
          <View
            style={{
              height: 64,
              position: 'absolute',
              bottom: 8,
              alignSelf: 'center',
            }}>
            <NativeAdsOnboardingDetail
              onPress={(item: boolean) => handleLoadAds(item)}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnBoardingByQrBeLocated;
