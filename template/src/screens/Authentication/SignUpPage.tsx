import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import CustomButton from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SignUpPage = (): JSX.Element => {
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [text, onChangeText] = React.useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const { t } = useTranslation();

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
                top: 260,
              }}>
              <View>
                <View style={{ height: 120 }}>
                  <Text style={styleTextName}>{t('Sign Up')}</Text>
                  <Text style={styleTextInfoDetails}>
                    Please enter your profile. Don't worry, only you can see
                    your personal data. No one else will be able to see it
                  </Text>
                </View>
                <View style={{ height: 78 }}>
                  <Text style={styleTextLabel}>{t('Name')}</Text>
                  <View style={{ height: 52 }}>
                    <TextInput
                      style={{
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
                <View style={{ height: 88 }}>
                  <Text style={styleTextLabel}>{t('Password')}</Text>
                  <View style={{ height: 52 }}>
                    <TextInput
                      style={{
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
                <View style={{ height: 88 }}>
                  <Text style={styleTextLabel}>{t('Password')}</Text>
                  <View style={{ height: 52 }}>
                    <PhoneInput
                      ref={phoneInput}
                      defaultValue={value}
                      textInputStyle={{
                        height: 50,
                        justifyContent: 'center',
                        paddingTop: 16,
                      }}
                      containerStyle={{ height: 50 }}
                      defaultCode='DM'
                      layout='first'
                      onChangeText={(text) => {
                        setValue(text);
                      }}
                      onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                      }}
                      withDarkTheme
                      withShadow
                      autoFocus
                    />
                  </View>
                </View>
              </View>
              <View style={{ height: 108, top: 24 }}>
                <CustomButton
                  onPress={() => navigation.navigate('SelectLanguage')}
                  title={t('Next')}
                />
                <View style={{ height: 26, top: 8 }}>
                  <Text style={styleTextLayot}>
                    Already have an account?{' '}
                    <Text
                      style={styleTextSignUp}
                      onPress={() => navigation.navigate('LoginPage')}>
                      Sign in
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

export default SignUpPage;

const style = StyleSheet.create({});
