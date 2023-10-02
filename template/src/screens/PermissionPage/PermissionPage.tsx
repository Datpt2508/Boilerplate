import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageBackground,
  Linking,
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

import { useTopInset } from '~/hooks/useInset';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/IconBack';
import IconSuggest from '~/resources/Icons/IconSuggest';
import { useAppTheme } from '~/resources/theme';

import ButtonCustom from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const PermissionPage = () => {
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { t } = useTranslation();
  const topInsets = useTopInset();

  const styleText = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.black,
        fontWeight: 'bold',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 18,
        marginBottom: 8,
        lineHeight: 24,
      },
    ],
    [theme],
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getImage('imageBackgroundApp')}
        resizeMode='cover'
        style={{ flex: 1, paddingTop: topInsets }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ paddingTop: 32, paddingHorizontal: 16 }}>
            <TouchableOpacity
              style={{ height: 32 }}
              onPress={() => navigation.goBack()}>
              <IconBack width={32} height={32} />
            </TouchableOpacity>
          </View>
          <ScrollView
            bounces={false}
            style={{ paddingHorizontal: 16 }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={{ paddingTop: 20 }}>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styleText}>
                  {t(
                    `You will need to set “Location” to allow all the time in settings. If not the app will not work properly.`,
                  )}
                </Text>
                <View>
                  <Text style={{ color: '#777C7E' }}>
                    {t(`1. Click the below 'Open Setting'`)}
                  </Text>
                  <Text style={{ color: '#777C7E' }}>
                    {t(`2. Click 'Permissions' and then 'Location'`)}
                  </Text>
                  <Text style={{ color: '#777C7E' }}>
                    {t(`3. Set to Allow all the time`)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 400,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={getImage('imagePermission')} />
              </View>
            </View>

            <ButtonCustom
              onPress={() => Linking.openSettings()}
              title={t('Open Settings')}
              style={{ width: '70%', alignSelf: 'center' }}
            />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PermissionPage;
