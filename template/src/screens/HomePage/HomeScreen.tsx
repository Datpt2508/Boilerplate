import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useInterstitialAd } from 'react-native-google-mobile-ads';

import { useTopInset } from '~/hooks/useInset';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconBeLocate from '~/resources/Icons/IconPhoneTrack/IconBeLocate';
import IconLocate from '~/resources/Icons/IconPhoneTrack/IconLocate';
import IconProfile from '~/resources/Icons/IconPhoneTrack/IconProfile';
import IconZone from '~/resources/Icons/IconPhoneTrack/IconZone';

import { ANDROID_INTER_HOME, IOS_INTER_HOME } from '@env';
import Divider from '~/base/Divider';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import NativeAdsHomeScreen from '../components/NativeADS/NativeAdsHomeScreen';

const ID_ADS_INTER_HOME =
  Platform?.OS === 'ios' ? IOS_INTER_HOME : ANDROID_INTER_HOME;

const HomeScreen = () => {
  const { t } = useTranslation();
  const topInsets = useTopInset();
  const adsMobState = usePreferenceContext()?.result?.adsMobState;
  const navigation = useNavigation<RootNavigatorNavProps>();
  const actionMethod = usePreferenceActionsContext();

  const [loadAds, setLoadAds] = useState(true);
  const [indexNavigate, setIndexNavigate] = useState<number>();

  const isRemoteNativeAds = adsMobState?.Native_home;
  const isRemoteInterAds = adsMobState?.Inter_home;
  const isShowInterAds = usePreferenceContext()?.result?.isShowInterstitial;

  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    ID_ADS_INTER_HOME,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isClosed) {
      setTimeout(() => {
        actionMethod?.setActionIsShowInterstitial?.(false);
      }, 30000);
      switch (indexNavigate) {
        case 0:
          navigation.navigate('BottomTabNavigator', {
            screen: 'HomeNavigator',
          });
          break;
        case 1:
          navigation.navigate('BottomTabNavigator', {
            screen: 'LocatedNavigator',
          });
          break;
        // case 2:
        //   navigation.navigate('BottomTabNavigator', {
        //     screen: 'ZoneAlertNavigator',
        //   });
        //   break;
        case 2:
          navigation.navigate('BottomTabNavigator', {
            screen: 'ProfileNavigator',
          });
          break;
        // case 3:
        //   navigation.navigate('BottomTabNavigator', {
        //     screen: 'ProfileNavigator',
        //   });
        // break;
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isClosed, navigation]);

  const dataLocate = [
    {
      title: t('Locate'),
      description: t(
        'Locate your loved ones by sending a code from your phone',
      ),
      icon: <IconLocate />,
    },
    {
      title: t('Be located'),
      description: t('I have a code and i want to share my location'),
      icon: <IconBeLocate />,
    },
    // {
    //   title: t('Zone Alert'),
    //   description: t(
    //     'Set places and get alert when your loved ones enter or leave these places',
    //   ),
    //   icon: <IconZone />,
    // },
    {
      title: t('Profile'),
      description: t('Your profile, settings and more'),
      icon: <IconProfile />,
    },
  ];

  const handleNavigate = (item: number) => {
    setIndexNavigate(item);

    if (!isShowInterAds) {
      if (isRemoteInterAds && isLoaded) {
        show();
        actionMethod?.setActionIsShowInterstitial?.(true);
      } else {
        switch (item) {
          case 0:
            navigation.navigate('BottomTabNavigator', {
              screen: 'HomeNavigator',
            });
            break;
          case 1:
            navigation.navigate('BottomTabNavigator', {
              screen: 'LocatedNavigator',
            });
            break;
          // case 2:
          //   navigation.navigate('BottomTabNavigator', {
          //     screen: 'ZoneAlertNavigator',
          //   });
          //   break;
          case 2:
            navigation.navigate('BottomTabNavigator', {
              screen: 'ProfileNavigator',
            });
            break;
          // case 3:
          //   navigation.navigate('BottomTabNavigator', {
          //     screen: 'ProfileNavigator',
          //   });
          // break;
        }
      }
    } else {
      switch (item) {
        case 0:
          navigation.navigate('BottomTabNavigator', {
            screen: 'HomeNavigator',
          });
          break;
        case 1:
          navigation.navigate('BottomTabNavigator', {
            screen: 'LocatedNavigator',
          });
          break;
        // case 2:
        //   navigation.navigate('BottomTabNavigator', {
        //     screen: 'ZoneAlertNavigator',
        //   });
        //   break;
        case 2:
          navigation.navigate('BottomTabNavigator', {
            screen: 'ProfileNavigator',
          });
          break;
        // case 3:
        //   navigation.navigate('BottomTabNavigator', {
        //     screen: 'ProfileNavigator',
        //   });
        // break;
      }
    }
  };

  const handleLoadAds = (item: boolean) => {
    setLoadAds(item);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getImage('imageBackgroundApp')}
        resizeMode='cover'
        style={styles.bgImage}>
        <View style={[styles.main, { paddingTop: topInsets }]}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.title}>{t('Phone Tracker')}</Text>
            <View style={styles.detail}>
              <ScrollView style={styles.viewDes}>
                {dataLocate.map((item, index) => {
                  return (
                    <View key={index} style={{ marginTop: 8 }}>
                      <TouchableOpacity
                        onPress={() => handleNavigate(index)}
                        style={{
                          flexDirection: 'row',
                          marginBottom: 12,
                          alignItems: 'center',
                        }}>
                        {item?.icon}
                        <View style={styles.description}>
                          <Text style={styles.titleDes}>{item?.title}</Text>
                          <Text style={styles.des}>{item?.description}</Text>
                        </View>
                      </TouchableOpacity>
                      {index !== dataLocate?.length - 1 && (
                        <Divider style={styles.divider} />
                      )}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
        {loadAds && isRemoteNativeAds && (
          <NativeAdsHomeScreen
            onPress={(item: boolean) => handleLoadAds(item)}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  main: {
    flex: 1,
    marginHorizontal: 24,
  },
  title: {
    fontWeight: '700',
    color: '#0057E7',
    fontSize: 24,
  },
  detail: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginTop: 32,
    borderRadius: 12,
  },
  viewDes: {
    margin: 20,
  },
  description: {
    marginHorizontal: 12,
  },
  titleDes: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  des: {
    width: 240,
    fontWeight: '400',
    fontSize: 14,
    color: '#AAAFB1',
  },
  divider: {
    height: 0.5,
    color: '#000000',
    marginBottom: 24,
  },
});

export default HomeScreen;
