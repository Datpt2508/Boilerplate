import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useTopInset } from '~/hooks/useInset';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconBeLocated from '~/resources/Icons/IconBeLocated';
import IconLocation from '~/resources/Icons/IconLocation';
import IconNext from '~/resources/Icons/IconNext';
import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import NativeAdsOnboarding from '../components/NativeADS/NativeAdsOnboarding';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const OnBoardingPage = () => {
  const navigation = useNavigation<RootNavigatorNavProps>();
  const theme = useAppTheme();
  const { t } = useTranslation();
  const topInsets = useTopInset();
  const actionMethod = usePreferenceActionsContext();
  const [loadAds, setLoadAds] = useState(true);
  const adsMobState = usePreferenceContext()?.result?.adsMobState;

  const isRemoteNativeAds = adsMobState?.Native_tutorial;

  const styleTextTitle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.blue,
        fontWeight: '700',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
      },
    ],
    [theme],
  );

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

  const styleTextButton = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.white,
        fontWeight: '700',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 24,
        lineHeight: 32,
      },
    ],
    [theme],
  );

  const styleTextContent = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.white,
        fontWeight: '400',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 14,
        lineHeight: 24,
      },
    ],
    [theme],
  );

  const handleNavigateLocate = () => {
    actionMethod?.setActionIsLocated?.(false);
    navigation.navigate('LocateOnBoardingStart');
  };

  const handleNavigateBeLocated = () => {
    actionMethod?.setActionIsLocated?.(true);
    navigation.navigate('BeLocateOnBoardingStart');
  };

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
          }}>
          <Text style={styleTextTitle}>{t('Phone Tracker')}</Text>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 30,
              marginHorizontal: 16,
              justifyContent: 'center',
            }}>
            <Text style={styleText}>{t('I want to...')}</Text>

            <TouchableOpacity
              onPress={handleNavigateLocate}
              style={{
                height: 142,
                marginTop: 30,
                marginBottom: 40,
                width: SCREEN_WIDTH - 32,
              }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#F2F4F5',
                  backgroundColor: '#0057E7',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  zIndex: 2,
                }}>
                <IconLocation width={35} height={51} />
              </View>
              <LinearGradient
                colors={['#4396F7', '#080058']}
                style={{
                  height: 142,
                  width: SCREEN_WIDTH - 32,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#4396F7',
                  backgroundColor: '#0057E7',
                  position: 'absolute',
                  zIndex: 1,
                  marginTop: 20,
                }}>
                <View style={{ height: 98 }}>
                  <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 88 }}>
                      <Text style={styleTextButton}>{t('Locate')}</Text>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        marginHorizontal: 16,
                        maxWidth: '90%',
                      }}>
                      <Text style={styleTextContent}>
                        {t(
                          'Locate your loved ones by sending a code from your phone',
                        )}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 100,
                        backgroundColor: '#FFFFFF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: 16,
                        bottom: -8,
                        top: 90,
                      }}>
                      <IconNext height={18} width={18} />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNavigateBeLocated}
              style={{
                height: 142,
                marginTop: 30,
                width: SCREEN_WIDTH - 32,
              }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#F2F4F5',
                  backgroundColor: '#0057E7',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  zIndex: 2,
                }}>
                <IconBeLocated width={50} height={50} />
              </View>
              <LinearGradient
                colors={['#4396F7', '#080058']}
                style={{
                  height: 142,
                  width: SCREEN_WIDTH - 32,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#4396F7',
                  backgroundColor: '#0057E7',
                  position: 'absolute',
                  zIndex: 1,
                  marginTop: 20,
                }}>
                <View style={{ height: 98 }}>
                  <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 88 }}>
                      <Text style={styleTextButton}>{t('Be Located')}</Text>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        marginHorizontal: 16,
                        maxWidth: '90%',
                      }}>
                      <Text style={styleTextContent}>
                        {t('I have a code and i want to share my location')}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 100,
                      backgroundColor: '#FFFFFF',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 16,
                      bottom: -8,
                      top: 80,
                    }}>
                    <IconNext height={18} width={18} />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {loadAds && isRemoteNativeAds && (
          <View style={{ height: 250 }}>
            <NativeAdsOnboarding
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

export default OnBoardingPage;
