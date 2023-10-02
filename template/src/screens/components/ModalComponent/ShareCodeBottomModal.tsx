import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
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

import { getUserInfoByDeviceUUID } from '~/hooks/useFirebaseAction';
import useModalManager from '~/hooks/useModalManager';
import { useOrientation } from '~/hooks/useOrientation';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconBattery from '~/resources/Icons/IconBattery';
import { useAppTheme } from '~/resources/theme';

import BottomSheetModal from '~/screens/components/BottomSheetModal';

import { ANDROID_INTER_LOCATE, IOS_INTER_LOCATE } from '@env';
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import ButtonCustom from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CELL_COUNT = 6;

const ID_ADS_INTER_LOCATE =
  Platform?.OS === 'ios' ? IOS_INTER_LOCATE : ANDROID_INTER_LOCATE;

const ModalContent = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();

  const actionMethod = usePreferenceActionsContext();
  const actionButton = usePreferenceContext();
  const deviceUuid = actionButton?.result?.deviceUUID;

  const [value, setValue] = useState('');
  const [userData, setUserData] = useState({});

  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const isRemoteInterAds = actionButton?.result?.adsMobState?.Inter_locate;

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    ID_ADS_INTER_LOCATE,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  console.log('🚀 ~ file: ShareCodeBottomModal.tsx:81 ~ isClosed:', isClosed);

  useEffect(() => {
    load();
  }, [load]);

  // useEffect(() => {
  //   if (isClosed) {
  //     console.log('123');
  //     navigation.navigate('AddFriendPage', {});
  //   }
  // }, [isClosed]);

  const modalContainer = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingVertical: 20,
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

  useEffect(() => {
    const userDocumentRef = firestore().collection('Users').doc(deviceUuid);

    // Listen for changes to the user document in real-time
    userDocumentRef.onSnapshot((documentSnapshot) => {
      if (documentSnapshot.exists) {
        const userDataFetch = documentSnapshot.data();
        setUserData(userDataFetch);
      } else {
        console.log('User does not exist.');
      }
    });
  }, []);

  const handleAddFriend = () => {
    onCloseModal();

    if (isRemoteInterAds && isLoaded) {
      show();
      setTimeout(() => {
        navigation.navigate('AddFriendPage', {});
      }, 3000);
    } else {
      navigation.navigate('AddFriendPage', {});
    }
  };

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <View style={modalContainer}>
        <View style={{ height: 132, marginHorizontal: 16 }}>
          <View style={{ height: 80 }}>
            <CodeField
              ref={ref}
              {...props}
              value={userData?.invite_code}
              editable={false}
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
        <View style={{ height: 364 }}>
          <View
            style={{
              height: 300,
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
            style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}
          />
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

const expandedHeights = ['90%'];

const ShareCodeBottomModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('ShareCodeBottomModal');
  const visible = isOpen('ShareCodeBottomModal');

  const onClose = (): void => {
    closeModal('ShareCodeBottomModal');
  };

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onClose}
      expandedHeights={expandedHeights}>
      {visible ? <ModalContent onCloseModal={onClose} /> : null}
    </BottomSheetModal>
  );
};

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
    borderColor: '##D0D5DD',
  },
  //   modal: {
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   textTitle: {
  //     textAlign: 'center',

  //     marginBottom: 16,
  //     fontWeight: 'bold',
  //   },
  //   viewInfo: {
  //     height: 60,
  //     marginBottom: 16,
  //     justifyContent: 'center',
  //   },
  //   keyboardAwareContent: {
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     flex: 1,
  //   },
  //   inputInformation: {
  //     height: 36,
  //     borderRadius: 5,
  //     marginHorizontal: 16,

  //     textAlign: 'center',
  //   },
  //   inputInformationAlert: {
  //     height: 35,
  //     borderRadius: 5,
  //     marginHorizontal: 16,

  //     textAlign: 'center',

  //     borderColor: '#',
  //     borderWidth: 1,
  //   },
  contentContainer: {
    justifyContent: 'flex-start',
    // flex: 1,
    paddingBottom: 40,
  },
  //   containerButton: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default ShareCodeBottomModal;
