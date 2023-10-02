import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import QRCode from 'react-native-qrcode-svg';

import { useTopInset } from '~/hooks/useInset';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconClose from '~/resources/Icons/IconClose';
import IconLine from '~/resources/Icons/IconPhoneTrack/IconLine';
import { useAppTheme } from '~/resources/theme';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import ButtonCustom from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';

const ShareCodePage = () => {
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const topInsets = useTopInset();
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [userData, setUserData] = useState({});
  const actionButton = usePreferenceContext();
  const deviceUuid = actionButton?.result?.deviceUUID;

  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    GoogleAdsIds.INTERSTITIAL,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  useEffect(() => {
    load();
  }, [isClosed, load]);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({ value, cellCount: 6 });

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        // backgroundColor: theme.colors.backgroundColor,
        flex: 1,
      },
    ],
    [theme],
  );

  const modalContainer = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingVertical: 32,
      paddingHorizontal: 16,
      borderRadius: 12,
    }),
    [],
  );

  const styleText = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.text,
        fontFamily: 'SFProDisplay-Medium',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
      },
    ],
    [theme],
  );

  const handleAddFriend = () => {
    if (!isLoaded) {
      navigation.navigate('AddFriendPage', {});
    } else {
      show();
      navigation.navigate('AddFriendPage', {});
    }

    // navigation.navigate('AddFriendPage');
    AsyncStorage.setItem('isFirstOpen', 'true');
  };

  useEffect(() => {
    const userDocumentRef = firestore().collection('Users').doc(deviceUuid);

    const unsubscribe = userDocumentRef.onSnapshot((documentSnapshot) => {
      if (documentSnapshot.exists) {
        const userDataGet = documentSnapshot.data();

        setUserData(userDataGet);
      } else {
        console.log('User does not exist.');
        // Handle the case where the user document does not exist
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  const handleClose = () => {
    if (!isLoaded) {
      navigation.navigate('BottomTabNavigator', { screen: 'HomeNavigator' });
      AsyncStorage.setItem('isFirstOpen', 'true');
    } else {
      show();
      navigation.navigate('BottomTabNavigator', { screen: 'HomeNavigator' });
      AsyncStorage.setItem('isFirstOpen', 'true');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getImage('imageBackgroundShareCode')}
        resizeMode='cover'
        style={{ flex: 1, paddingTop: topInsets }}>
        <SafeAreaView style={styleContainer}>
          <View
            style={{
              height: '100%',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                height: '80%',
                backgroundColor: '#FFF',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <Pressable
                style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }}
                onPress={handleClose}>
                <IconClose height={28} width={28} />
              </Pressable>
              <View style={modalContainer}>
                <View style={{ height: 132, marginHorizontal: 16 }}>
                  <View style={{ height: 80 }}>
                    <CodeField
                      ref={ref}
                      {...props}
                      editable={false}
                      value={userData?.invite_code}
                      onChangeText={setValue}
                      cellCount={6}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType='default'
                      textContentType='oneTimeCode'
                      renderCell={({ index, symbol, isFocused }) => (
                        <Text
                          key={index}
                          style={[styles.cell, isFocused && styles.focusCell]}
                          onLayout={getCellOnLayoutHandler(index)}>
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      )}
                    />
                  </View>
                  <Text style={styleText}>
                    {t(
                      'Share your code to your friends, so you can connect and see their location',
                    )}
                  </Text>
                </View>
                <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
                  <IconLine width='100%' />
                </View>
                <View style={{ height: 364 }}>
                  <View
                    style={{
                      height: 250,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <QRCode
                      value={userData?.invite_code}
                      logoBackgroundColor='transparent'
                      size={240}
                    />
                  </View>
                  <View style={{ marginHorizontal: 64 }}>
                    <Text style={styleText}>
                      {t('Scan this QR code to connect with your friends')}
                    </Text>
                  </View>
                  <ButtonCustom
                    onPress={handleAddFriend}
                    // onPress={handleShareCode}
                    title={t('Copy and share')}
                    style={{
                      width: '80%',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 10 },
  container: {
    flex: 1,
  },
  cell: {
    width: (SCREEN_WIDTH - 72) / 6 - 8,
    height: 60,
    lineHeight: 52,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#D0D5DD',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
    color: 'black',
  },
  focusCell: {
    borderColor: '##D0D5DD',
  },
});
export default ShareCodePage;
