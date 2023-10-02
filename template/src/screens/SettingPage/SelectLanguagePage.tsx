import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTopInset } from '~/hooks/useInset';

import IconBack from '~/resources/Icons/IconBack';
import IconSuccess from '~/resources/Icons/IconSuccess';
import { useAppTheme } from '~/resources/theme';

import SelectLanguage from '~/screens/components/SelectLanguage';

import i18n from 'i18next';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SelectLanguagePage = (): JSX.Element => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const topInsets = useTopInset();
  const [Language, setLanguage] = useState('');
  console.log(
    '🚀 ~ file: SelectLanguagePage.tsx:28 ~ SelectLanguagePage ~ Language:',
    Language,
  );
  const navigation = useNavigation<RootNavigatorNavProps>();

  const handleAccept = async () => {
    i18n.changeLanguage(Language);
    await AsyncStorage.setItem('languageApp', Language);
    navigation.navigate('BottomTabNavigator', {
      screen: 'HomeNavigator',
    });
  };

  return (
    <View style={[styles.container, { paddingTop: topInsets }]}>
      <SafeAreaView style={styles.Area}>
        <View style={styles.content}>
          <View style={styles.head}>
            <View style={styles.headLeft}>
              <View style={styles.iconBack}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <IconBack width={28} height={28} />
                </TouchableOpacity>
              </View>
              <View style={styles.title}>
                <Text style={[styles.textHead]}>{t('Select Language')}</Text>
              </View>
              <TouchableOpacity onPress={handleAccept}>
                <IconSuccess width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>
          <SelectLanguage
            selectLanguage={(language) => setLanguage(language)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  Area: {
    flex: 1,
  },
  content: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBack: {
    paddingRight: 8,
  },
  textHead: {
    fontSize: 24,
    fontWeight: '700',
    alignItems: 'center',
    color: '#0057E7',
    fontFamily: 'Urbanist',
  },
  headLeft: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default SelectLanguagePage;
