import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import usePreferenceContext from '~/hooks/usePreferenceContext';

import IconSuccess from '~/resources/Icons/IconSuccess';
import { useAppTheme } from '~/resources/theme';

import NativeAdsLanguage from '~/screens/components/NativeADS/NativeAdsLanguage';
import SelectLanguage from '~/screens/components/SelectLanguage';

import i18n from 'i18next';
import RadioButton from '~/base/RadioButton';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SelectLanguageOnboardingPage = (): JSX.Element => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const [Language, setLanguage] = useState('');
  const [loadAds, setLoadAds] = useState(true);
  const adsMobState = usePreferenceContext()?.result?.adsMobState;

  const isRemoteNativeAds = adsMobState?.Native_language;

  const navigation = useNavigation<RootNavigatorNavProps>();

  useFocusEffect(
    useCallback(() => {
      let backButtonPressCount = 0;
      let backButtonPressTimer = null;

      const onBackPress = () => {
        if (backButtonPressCount === 1) {
          // User has pressed the back button twice, so close the app
          BackHandler.exitApp();
          return true;
        } else {
          // First back button press, set a timer to reset the count
          backButtonPressCount++;
          backButtonPressTimer = setTimeout(() => {
            backButtonPressCount = 0;
            clearTimeout(backButtonPressTimer);
          }, 2000); // Adjust the timeout as needed (e.g., 2 seconds)
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const languageCountry = [
    {
      title: 'English',
      language: 'en_English',
      icon: (
        <Image
          source={require('../../resources/images/Language/english.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Hindi',
      language: 'hi_Hindi',
      icon: (
        <Image
          source={require('../../resources/images/Language/Hindi.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Portuguese',
      language: 'pt_Portuguese',
      icon: (
        <Image
          source={require('../../resources/images/Language/Por.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Spanish',
      language: 'es_Spanish',
      icon: (
        <Image
          source={require('../../resources/images/Language/Spanish.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Indonesian',
      language: 'id_Indonesian',
      icon: (
        <Image
          source={require('../../resources/images/Language/Indonesian.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Korean',
      language: 'ko_Korean',
      icon: (
        <Image
          source={require('../../resources/images/Language/Korean.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
  ];

  const handleAccept = async () => {
    navigation.navigate('OnBoardingPage');
    i18n.changeLanguage(Language);
    await AsyncStorage.setItem('languageApp', Language);
  };

  const handSelect = (item: any) => {
    setLanguage(item.language);
  };

  const handleLoadAds = (item: any) => {
    setLoadAds(item);
  };

  return (
    <View style={[styles.container]}>
      <SafeAreaView style={styles.Area}>
        <View style={styles.head}>
          <View style={styles.title}>
            <Text style={[styles.textHead]}>{t('Select Language')}</Text>
          </View>
          {Language && (
            <TouchableOpacity
              style={{ paddingRight: 24 }}
              onPress={handleAccept}>
              <IconSuccess width={24} height={24} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={{ paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.listItem}>
            {languageCountry.map((item) => (
              <TouchableOpacity
                key={item.language}
                style={
                  Language === item?.language ? styles.active : styles.item
                }
                onPress={() => handSelect(item)}>
                <View style={styles.contentItem}>
                  <View style={styles.leftItem}>
                    <View>{item.icon}</View>
                    <Text
                      style={[
                        styles.textItem,
                        {
                          color:
                            Language === item?.language ? '#0057E7' : '#262626',
                        },
                      ]}>
                      {item.title}
                    </Text>
                  </View>
                  <RadioButton
                    state={Language === item?.language ? true : false}
                    color={Language === item?.language ? '#0057E7' : '#ffffff'}
                    onPress={() => handSelect(item)}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {loadAds && isRemoteNativeAds && (
          <View style={{ height: 250 }}>
            <NativeAdsLanguage
              onPress={(item: boolean) => handleLoadAds(item)}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Area: {
    flex: 1,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4D7D8',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
  },
  textHead: {
    fontSize: 18,
    fontWeight: '700',
    // alignItems: 'center',
    color: '#0057E7',
    fontFamily: 'SFProDisplay-Medium',
  },
  title: {
    flex: 1,
    marginLeft: 24,
  },
  listItem: {
    paddingVertical: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
  item: {
    borderRadius: 7,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#50505024',
  },
  active: {
    borderRadius: 7,
    borderWidth: 2,
    marginBottom: 8,
    borderColor: '#0057E7',
  },
  contentItem: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    justifyContent: 'space-between',
  },
  textItem: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 8,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectLanguageOnboardingPage;
