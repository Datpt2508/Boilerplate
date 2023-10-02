import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import CustomButton from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [text, onChangeText] = React.useState('');

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        // backgroundColor: theme.colors.backgroundColor,
        flex: 1,
      },
    ],
    [theme],
  );

  const styleTextName = useMemo<StyleProp<TextStyle>>(
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
  const styleTextTitle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.black,
        fontWeight: '700',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 24,
        lineHeight: 32,
      },
    ],
    [theme],
  );
  const styleTextInfoDetails = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.black,
        fontWeight: '400',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 16,
        lineHeight: 24,
      },
    ],
    [theme],
  );
  const styleTextLabel = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.black,
        fontWeight: '700',
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 16,
        lineHeight: 24,
      },
    ],
    [theme],
  );
  const styleTextLayot = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.black,
        fontWeight: '500',
        fontFamily: 'Urbanist',
        fontSize: 16,
        lineHeight: 25.6,
        textAlign: 'center',
      },
    ],
    [theme],
  );
  const styleTextSignUp = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.blue,
        fontWeight: '700',
        fontFamily: 'Urbanist',
        fontSize: 16,
        lineHeight: 25.6,
        textAlign: 'center',
      },
    ],
    [theme],
  );
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={getImage('imageBackground')}
        resizeMode='cover'
        style={{ flex: 1 }}>
        <SafeAreaView style={styleContainer}>
          <ScrollView
            bounces={false}
            style={{ paddingHorizontal: 16 }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'flex-end',
                marginHorizontal: 16,
                top: 332,
              }}>
              <View style={{ height: 32, gap: 10 }}>
                <Text style={styleTextName}>{t('Phone Tracker')}</Text>
              </View>
              <View style={{ paddingTop: 24 }}>
                <View style={{ height: 84 }}>
                  <Text style={styleTextTitle}>{t('Welcom back,')}</Text>
                  <Text style={styleTextInfoDetails}>
                    {t('Please enter your email & password to sign in.')}
                  </Text>
                </View>
                <View style={{ height: 82 }}>
                  <Text style={styleTextLabel}>Name</Text>
                  <View style={{ height: 58 }}>
                    <TextInput
                      style={{
                        height: 52,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#D0D5DD',
                        backgroundColor: 'white',
                      }}
                      value={text}
                      onChangeText={onChangeText}
                    />
                  </View>
                </View>
                <View style={{ height: 82 }}>
                  <Text style={styleTextLabel}>{t('Password')}</Text>
                  <View style={{ height: 58 }}>
                    <TextInput
                      style={{
                        height: 52,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#D0D5DD',
                        backgroundColor: 'white',
                      }}
                      value={text}
                      onChangeText={onChangeText}
                    />
                  </View>
                </View>
              </View>
              <View style={{ height: 108, top: 24 }}>
                <CustomButton
                  onPress={() => navigation.navigate('SelectLanguage')}
                  title='Log in'
                />
                <View style={{ top: 8 }}>
                  <Text style={styleTextLayot}>
                    {t('Don’t have an account?')}
                    <Text
                      style={styleTextSignUp}
                      onPress={() => navigation.navigate('SignUpPage')}>
                      {t('Sign up')}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default LoginPage;
