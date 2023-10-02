import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import usePreferenceContext from '~/hooks/usePreferenceContext';

import IconCrown from '~/resources/Icons/IconCrown';
import IconDiamond from '~/resources/Icons/IconDiamond';
import IconLogo from '~/resources/Icons/IconLogo';
import IconSetting from '~/resources/Icons/IconSetting';
import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

interface HeaderHomeProps {
  onPress: () => void;
  text?: string;
}

const HeaderHome = ({ onPress, text }: HeaderHomeProps): JSX.Element => {
  const theme = useAppTheme();
  const { t } = useTranslation();

  const isPro = usePreferenceContext()?.result?.isPurchase;
  const coinGenerate = usePreferenceContext().result?.coinGenerate;
  const coinWeek = usePreferenceContext().result?.coinWeek;

  const navigation = useNavigation<RootNavigatorNavProps>();

  return (
    <View
      style={{
        height: 48,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        // marginTop: 12,
      }}>
      <IconLogo height={28} width={28} />
      <Text
        style={{
          fontFamily: 'Urbanist-Bold',
          fontSize: 24,
          color: theme.colors.text,
          fontWeight: '700',
          // marginLeft: !isPro ? 66 : 0,
        }}>
        {text}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <LinearGradient
          colors={['#F89300', '#FFBB58']}
          style={{
            borderRadius: 100,
            height: 32,
            marginLeft: 8,
            justifyContent: 'center',
          }}>
          {!isPro && coinGenerate === 0 ? (
            <TouchableOpacity
              onPress={onPress}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginHorizontal: 8,
              }}>
              <IconCrown />
              <Text
                style={{
                  marginLeft: 4,
                  color: '#FFFFFF',
                  fontFamily: 'Urbanist-SemiBold',
                }}>
                {t('PRO')}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginHorizontal: 8,
              }}>
              <IconDiamond />
              <Text
                style={{
                  marginLeft: 4,
                  color: '#FFFFFF',
                  fontFamily: 'Urbanist-SemiBold',
                }}>
                {coinGenerate + coinWeek}
              </Text>
            </View>
          )}
        </LinearGradient> */}
        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={() => navigation.navigate('SettingPage')}>
          <IconSetting height={32} width={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HeaderHome;
