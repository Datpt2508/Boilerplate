import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from 'react-native-phone-number-input';

import useModalManager from '~/hooks/useModalManager';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconClose from '~/resources/Icons/IconClose';
import IconEditAvatar from '~/resources/Icons/IconEditAvatar';
import { useAppTheme } from '~/resources/theme';

import * as yup from 'yup';
import ButtonCustom from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';
import { ImageUploadOptions } from '~/types/imageUpload';

import NativeAdsCreateProfile from '../components/NativeADS/NativeAdsCreateProfile';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CreateProfilePage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const { openModal } = useModalManager();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const resultContext = usePreferenceContext();
  const phoneInputRef = useRef<PhoneInput>(null);
  const animationRef = useRef<LottieView>(null);
  const adsMobState = usePreferenceContext()?.result?.adsMobState;

  const [phoneInput, onChangePhoneInput] = useState('');
  const [errPhone, setErrPhone] = useState('');
  const [errText, setErrText] = useState('');
  const [textInput, onChangeTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);
  const [countrySelected, setCountrySelected] = useState('VN');
  const [isImage, setIsImage] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number>();
  const [loadAds, setLoadAds] = useState(true);

  const defaultAvatarUrl =
    'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png';

  const [selectedImage, setSelectedImage] = useState<ImageUploadOptions | null>(
    { path: defaultAvatarUrl },
  );

  const UUID = resultContext?.result?.deviceUUID;
  const isLocated = resultContext?.result?.isLocated;
  const isRemoteNativeAds = adsMobState?.Native_profile;

  // const { isClosed, load } = useInterstitialAd(GoogleAdsIds.INTERSTITIAL, {
  //   requestNonPersonalizedAdsOnly: true,
  // });

  const isNextButtonDisabled = errPhone !== 'false' || errText !== 'false';

  // useEffect(() => {
  //   load();
  // }, [isClosed, load]);

  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     Geolocation.requestAuthorization('always');
  //   }
  // }, []);

  const hasPermissionIOS = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'disabled') {
      Alert.alert(
        t('Warning'),
        t(`Turn on Location Services to allow to determine your location.`),
        [{ text: t('Go to Settings'), onPress: () => Linking.openSettings() }],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setTimeout(() => {
        setOfflineStatus(offline);
      }, 3000);
    });

    return () => removeNetInfoSubscription();
  }, []);

  const styleTitle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.text,
        fontFamily: 'SFProDisplay-Medium',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 32,
      },
    ],
    [theme],
  );

  const styleText1 = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.text,
        // fontFamily: 'Body',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
      },
    ],
    [theme],
  );

  const styleUserName = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.text,
        // fontFamily: 'Body',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
      },
    ],
    [theme],
  );

  useEffect(() => {
    const getBatteryLevel = async () => {
      try {
        const battery = await DeviceInfo.getBatteryLevel();
        console.log('Battery Level:', battery);
        setBatteryLevel(battery);
      } catch (error) {
        console.error('Error getting battery level:', error);
        return null;
      }
    };
    getBatteryLevel();
  }, []);

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };

  const generateUniqueInviteCode = async (
    inviteCode: string,
  ): Promise<boolean> => {
    try {
      const invitesRef = firebase.firestore().collection('Invites');
      const querySnapshot = await invitesRef
        .where('invite_code', '==', inviteCode)
        .get();

      if (querySnapshot.size > 0) {
        const newCode = generateRandomCode();
        return generateUniqueInviteCode(newCode);
      } else {
        // setInvitedCode(inviteCode);
        return true;
      }
    } catch (error) {
      console.error('Error checking code availability:', error);
      throw error;
    }
  };

  const storeDataInFirestore = async (userData: any, inviteCode: string) => {
    const usersRef = firebase.firestore().collection('Users');
    await usersRef.doc(UUID).set(userData);
    const invitesRef = firebase.firestore().collection('Invites');
    await invitesRef.doc(inviteCode).set({ UUID });
  };

  const authenticateUser = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword('username@fetch.tech', '12345678@abc');
    } catch (error) {
      console.log('Error auth Firebase:', error);
    }
  };

  const createdInfo = async () => {
    setIsLoading(true);
    // Authentication
    await authenticateUser();
    const inviteCode = generateRandomCode();
    const isCodeGenerated = await generateUniqueInviteCode(inviteCode);

    if (isCodeGenerated) {
      // Initialize imageUrls with selectedDownloadURL
      let imageUrls = selectedImage ? selectedImage.path : defaultAvatarUrl;

      // Check if selectedImage is defined and has a path
      if (isImage) {
        // Get the image from local storage using the provided path
        const imageUri = selectedImage.path;

        // Upload the selected image to Firebase Storage
        const selectedImagePath = `images/${UUID}`;
        const selectedStorageRef = storage().ref().child(selectedImagePath);
        await selectedStorageRef.putFile(imageUri);

        // Get the download URL of the uploaded selected image
        const selectedDownloadURL = await selectedStorageRef.getDownloadURL();

        // Set the selectedDownloadURL directly as imageUrls
        imageUrls = selectedDownloadURL;
      }

      const userData = {
        invite_code: inviteCode,
        battery_percent: batteryLevel,
        full_name: textInput,
        phone_number: phoneInput,
        locations: [],
        friend: [],
        image_avatar: imageUrls,
        event_date: firebase.firestore.FieldValue.serverTimestamp(),
      };
      console.log('dataUpload to firebase', JSON.stringify(userData, null, 2));

      // Data storage
      await storeDataInFirestore(userData, inviteCode);
      // AsyncStorage.setItem('isFirstOpen', 'true');

      setTimeout(() => {
        setIsLoading(false);
        if (isLocated) {
          AsyncStorage.setItem('isFirstOpen', 'false');
          navigation.replace('BottomTabNavigator', {
            screen: 'LocatedNavigator',
          });
        } else {
          navigation.navigate('ShareCodePage');
        }
      }, 5000);
    }
  };

  const handleCreatedNewUser = async () => {
    Keyboard.dismiss();
    if (isOffline) {
      openModal('NetWorkDisableModal', true);
    } else {
      // if (Platform.OS === 'ios') {
      //   Geolocation.requestAuthorization('always');
      // }
      try {
        // const permissionStatus = await RNPermissions.check(
        //   Platform.OS === 'ios'
        //     ? PERMISSIONS.IOS.LOCATION_ALWAYS
        //     : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        // );
        // console.log(
        //   '🚀 ~ file: CreateProfilePage.tsx:301 ~ handleCreatedNewUser ~ permissionStatus:',
        //   permissionStatus,
        // );
        const hasPermission = await hasLocationPermission();

        if (hasPermission) {
          createdInfo();
        } else {
          setIsLoading(false);
          navigation.navigate('PermissionPage');
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    animationRef.current?.play();
    // animationRef.current?.play(0, 120);
  }, []);

  const handleSelectPhotosUpload = () => {
    Keyboard.dismiss();
    try {
      openModal('OptionsPhotoModal', true, {
        onImageCallback: (image: ImageUploadOptions) => {
          setLoading(true);
          setTimeout(() => {
            if (image) {
              setSelectedImage(image);
              setIsImage(true);
            } else {
              setSelectedImage({ path: defaultAvatarUrl });
            }
            setLoading(false);
          }, 3000);
        },
      });
    } catch (error) {
      console.error('Error in handleSelectPhotosUpload:', error);
    }
  };

  const phoneSchema =
    countrySelected === 'VN'
      ? yup
          .string()
          .required(t('Phone number is required'))
          .matches(
            /^[0-9]{10}$/,
            t('Phone numbers must contain only numbers and exactly 10 digits'),
          )
      : yup
          .string()
          .required(t('Phone number is required'))
          .matches(/^[0-9]+$/, t('Phone number must contain only numbers'));

  const handleChangePhoneNumber = (data) => {
    phoneSchema
      .validate(data)
      .then(() => {
        console.log('Phone number is valid');
        onChangePhoneInput(data);
        setErrPhone('false');
      })
      .catch((error) => {
        console.log('Phone number validation error:', error.message);
        setErrPhone(error.message);
      });
    // // Check if the selected country code is 'VN'
    // if (phoneInputRef.current?.getCountryCode() === 'VN') {
    //   console.log('1', phoneInputRef.current?.getCountryCode());
    //   const vnPhoneNumber = data.replace(/\D/g, ''); // Remove non-digit characters
    //   if (vnPhoneNumber.length !== 10) {
    //     // Validation for 'VN': Exactly 10 digits
    //     setErrPhone('false');
    //   }
    // }
  };

  const handleChangeText = (data: string) => {
    data = data.trim();

    const textSchema = yup
      .string()
      .min(3, t('Username must be at least 3 characters'))
      .max(20, t('Username must be at most 20 characters'))
      .matches(
        /^((?![\d~`!@#$%^&*()_=+[\]{}\\|:;“<>/?]).){1,255}$/,
        t('Only alphabetical characters are allowed'),
      );
    textSchema
      .validate(data)
      .then(() => {
        onChangeTextInput(data);
        setErrText('false');
      })
      .catch((error) => {
        console.log('Text validation error:', error.message);
        setErrText(error.message);
      });
  };

  const handleCountryChange = (country: any) => {
    setCountrySelected(country?.cca2);
    // () => handleChangePhoneNumber();
  };

  const handleLoadAds = (item: boolean) => {
    setLoadAds(item);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getImage('imageBackgroundApp')}
        resizeMode='cover'
        style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {isLoading && (
            <LottieView
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                backgroundColor: '#00000050',
              }}
              loop
              autoPlay
              ref={animationRef}
              source={require('~/resources/animation/animation_2.json')}
            />
          )}
          {loading && (
            <LottieView
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                backgroundColor: '#00000050',
              }}
              loop
              autoPlay
              ref={animationRef}
              source={require('~/resources/animation/animation_2.json')}
            />
          )}
          <View style={{ paddingTop: 24, marginHorizontal: 24 }}>
            <View style={{ height: 104, marginHorizontal: 16, paddingTop: 42 }}>
              <Text style={styleTitle}>{t('Almost done!!')}</Text>
              <Text style={styleText1}>
                {t('Enter your profile to help your loved ones find you')}
              </Text>
            </View>

            <View
              style={{
                marginTop: 24,
                marginHorizontal: 16,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={handleSelectPhotosUpload}
                style={{
                  height: 124,
                  width: 124,
                  justifyContent: 'center',
                }}>
                <LinearGradient
                  colors={['#00FFD1', '#0029FF']}
                  style={{
                    width: 124,
                    height: 124,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{ width: 120, height: 120, borderRadius: 100 }}>
                    {selectedImage ? (
                      <FastImage
                        source={{
                          uri: selectedImage.path,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png',
                        }}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 100,
                        }}
                      />
                    )}
                  </View>
                </LinearGradient>
                <IconEditAvatar
                  width={24}
                  height={25}
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    bottom: 0,
                    right: 0,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 120, marginHorizontal: 16 }}>
              <Text style={styleUserName}>{t('Name')}</Text>
              <View style={{ height: 58 }}>
                <TextInput
                  style={{
                    height: 52,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#D0D5DD',
                    backgroundColor: 'white',
                    color: 'black',
                    paddingLeft: 16,
                  }}
                  // value={textInput}
                  onChangeText={handleChangeText}
                />
              </View>
              {errText !== '' && errText !== 'false' && (
                <Text
                  style={{
                    marginVertical: 6,
                    color: 'red',
                    fontWeight: '500',
                  }}>
                  {errText}
                </Text>
              )}

              <Text style={styleUserName}>{t('Phone number')}</Text>

              <PhoneInput
                ref={phoneInputRef}
                // defaultValue={formattedValue}
                textInputStyle={{
                  height: 50,
                  justifyContent: 'center',
                  paddingTop: Platform.OS === 'android' ? 12 : 0,
                }}
                onChangeCountry={handleCountryChange}
                codeTextStyle={{ fontSize: 16 }}
                containerStyle={{ height: 54 }}
                defaultCode='VN'
                layout='first'
                onChangeText={handleChangePhoneNumber}
              />
              {errPhone !== '' && errPhone !== 'false' && (
                <Text
                  style={{
                    marginVertical: 6,
                    color: 'red',
                    fontWeight: '500',
                  }}>
                  {errPhone}
                </Text>
              )}
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 100 }}>
              <ButtonCustom
                onPress={(country: any) => handleCreatedNewUser(country)}
                title={t('Next')}
                disabled={isNextButtonDisabled}
              />
            </View>
          </View>
        </ScrollView>

        {loadAds && isRemoteNativeAds && (
          <View style={{ height: 250 }}>
            <NativeAdsCreateProfile
              onPress={(item: boolean) => handleLoadAds(item)}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};
export default CreateProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
