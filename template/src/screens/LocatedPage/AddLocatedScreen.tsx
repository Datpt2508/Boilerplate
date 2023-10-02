import firestore from '@react-native-firebase/firestore';
import {
  // RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute, // useRoute,
} from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  BackHandler,
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useInterstitialAd } from 'react-native-google-mobile-ads';

import useModalManager from '~/hooks/useModalManager';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconClose from '~/resources/Icons/IconClose';
import IconScanQR from '~/resources/Icons/IconScanQR';
import { useAppTheme } from '~/resources/theme';

import ButtonCustom from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LocatedPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal, getParams } = useModalManager();
  const actionMethod = usePreferenceActionsContext();
  const actionButton = usePreferenceContext();
  const inviteId = actionButton?.result?.qrInvite;
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: 6 });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  useEffect(() => {
    setIsNextButtonEnabled(value.length === 6); // Enable the button if the input length is 6
  }, [value]);

  const { isClosed, load } = useInterstitialAd(GoogleAdsIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    if (inviteId !== '') {
      // console.log('1111:', inviteId);
      setValue(inviteId);
    }
  }, [inviteId]);

  // useEffect(() => {
  //   load();
  // }, [isClosed, load]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const styleTextTitle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.text,
        fontFamily: 'SFProDisplay-Medium',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'center',
      },
    ],
    [theme],
  );

  const styleTextHeader = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.blue,
        fontFamily: 'SFProDisplay-Medium',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 32,
        textAlign: 'center',
      },
    ],
    [theme],
  );

  const styleDesciption = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.text,
        // fontFamily: 'Body',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
      },
    ],
    [theme],
  );

  const checkInviteCode = async (codeToCheck: string) => {
    try {
      const invitesCollection = firestore().collection('Invites');

      // Query Firestore to find the document with the matching code
      const documentSnapshot = await invitesCollection.doc(codeToCheck).get();

      if (!documentSnapshot.exists) {
        return null;
      }

      // Get the deviceUUID from the matching document
      const deviceUUID = documentSnapshot.data();

      return deviceUUID;
    } catch (error) {
      console.error('Error checking invite code:', error);
      return null; // Handle the error as needed
    }
  };

  const handleCheckCodeInvite = () => {
    checkInviteCode(value).then(async (deviceUUID) => {
      if (deviceUUID) {
        console.log('Matching deviceUUID:', deviceUUID);
        actionMethod?.setActionFriendUUID?.(deviceUUID.UUID);
        await getUserInfoByDeviceUUID(deviceUUID.UUID);
      } else {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
        console.log('No matching code found.');
      }
    });
  };

  const getUserInfoByDeviceUUID = async (friendUUID: string) => {
    try {
      const userDocumentRef = firestore().collection('Users').doc(friendUUID);
      const documentSnapshot = await userDocumentRef.get();

      if (documentSnapshot.exists) {
        const userData = documentSnapshot.data();
        actionMethod?.setActionFriendName?.(userData?.full_name);
        if (userData?.full_name) {
          openModal('ConfirmAddFriendModal', true, {
            nameFriend: userData?.full_name,
          });
        }
      } else {
        Alert.alert(t('Error'), t(`Connect track is error. Please try again`), [
          {
            text: t('OK'),
            onPress: () => console.log('error connect'),
            style: 'default',
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <>
      <View style={{ flex: 1, paddingTop: 24 }}>
        <View style={{ height: 42, paddingTop: 5 }}>
          <Text style={styleTextHeader}>{t('Be Located')}</Text>
        </View>
        <View style={{ marginHorizontal: 32, marginTop: 48 }}>
          <View style={{ height: 220 }}>
            <View style={{ height: 66, marginHorizontal: 5 }}>
              <Text style={styleTextTitle}>
                {t('Enter your friend code to connect with them')}
              </Text>
            </View>
            <View style={{ height: 80 }}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
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
            <View style={{ height: 66, marginHorizontal: 5 }}>
              <Text style={styleDesciption}>
                {t(
                  'Enter the code from your locator to share your location safely',
                )}
              </Text>
            </View>
          </View>
          <ButtonCustom
            onPress={handleCheckCodeInvite}
            title={t('Next')}
            disabled={!isNextButtonEnabled}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('QrScanPage')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <IconScanQR height={82} width={82} />
          </TouchableOpacity>
        </View>
        {errorMessage && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 4,
              borderColor: '#FFCCC7',
              borderWidth: 1,
              backgroundColor: '#FFF1F0',
              padding: 8,
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
            }}>
            <IconClose height={12} />
            <Text style={{ marginLeft: 8, color: '#000' }}>
              {t('Invalid code. Please recheck and try again')}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};
export default LocatedPage;

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 10 },
  cell: {
    width: 41,
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
    borderColor: '#0057E7',
  },
});
