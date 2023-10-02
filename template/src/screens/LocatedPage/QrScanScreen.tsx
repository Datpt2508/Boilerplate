import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { useTopInset } from '~/hooks/useInset';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/IconBack';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const QrScanScreen = () => {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation<RootNavigatorNavProps>();
  const actionMethod = usePreferenceActionsContext();
  const topInsets = useTopInset();

  const handleSuccess = (e) => {
    // console.log('111', e?.data);
    actionMethod?.setActionQRInvite?.(e?.data);
    navigation.replace('BottomTabNavigator', {
      screen: 'LocatedNavigator',
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={getImage('imageBackgroundApp')}
        resizeMode='cover'
        style={{ flex: 1, paddingTop: topInsets }}>
        <SafeAreaView style={styles.margin}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={handleBack}>
              <IconBack width={28} height={28} />
            </TouchableOpacity>
            <Text style={styles.title}>{t('Scan QR code')}</Text>
            <Text style={{ width: 24 }} />
          </View>
          <View
            style={{
              // marginTop: 24,
              height: screenHeight * 0.8,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'gray',
              // borderRadius: 50,
              // marginBottom: 24,
              // borderWidth: 4,
              // borderColor: '#fff'
            }}>
            <QRCodeScanner
              onRead={(e) => handleSuccess(e)}
              cameraStyle={{
                // height: screenHeight * 0.7,
                marginHorizontal: 24,
                width: '88%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              // cameraContainerStyle={{
              //   borderWidth: 4,
              //   marginHorizontal: 24,
              // }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginHorizontal: 80,
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 20,
                textAlign: 'center',
                color: '#000',
              }}>
              {t('Please move your camera over another device’s screen')}
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 24,
    marginBottom: Platform.OS === 'ios' ? 12 : 18,
    marginTop: Platform.OS === 'ios' ? 12 : 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    color: '#0057E7',
  },
});

export default QrScanScreen;
