// import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
  // RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  AppState,
  BackHandler,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ExitApp from 'react-native-exit-app';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { TextInput } from 'react-native-paper';

import { useTopInset } from '~/hooks/useInset';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';
import { closeInAppBrowser, openInAppBrowser } from '~/libs/openBrowser';

import IconConfirm from '~/resources/Icons/IconConfirm';
import IconEditLocated from '~/resources/Icons/IconEditLocated';
import IconFeedback from '~/resources/Icons/IconProfile/IconFeedback';
import IconLanguage from '~/resources/Icons/IconProfile/IconLanguage';
import IconPrivacy from '~/resources/Icons/IconProfile/IconPrivacy';
import IconRate from '~/resources/Icons/IconProfile/IconRate';
import IconShare from '~/resources/Icons/IconProfile/IconShare';
import IconUse from '~/resources/Icons/IconProfile/IconUse';

import ShimmerPlaceholder from '~/screens/components/ShimmerPlaceholder';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';
import { ImageUploadOptions } from '~/types/imageUpload';

const ProfilePage = (): JSX.Element => {
  const navigation = useNavigation<RootNavigatorNavProps>();
  const resultContext = usePreferenceContext();

  const UUID = resultContext?.result?.deviceUUID;
  const [userName, setUserName] = useState('');
  const [newName, setNewName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isShow, setIsShow] = useState(false);
  const { t } = useTranslation();
  const topInsets = useTopInset();
  const [loading, setLoading] = useState(false);

  const { openModal } = useModalManager();
  const animationRef = useRef<LottieView>(null);

  // const { isClosed, load } = useInterstitialAd(GoogleAdsIds.INTERSTITIAL, {
  //   requestNonPersonalizedAdsOnly: true,
  // });

  const handleEdit = () => {
    setIsShow(true);
    setNewName(userName);
  };

  // useEffect(() => {
  //   load();
  // }, [isClosed, load]);

  useEffect(() => {
    animationRef.current?.play();
    // animationRef.current?.play(0, 120);
  }, []);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       openInAppBrowser(
  //         'https://triple-privacy.s3.ap-southeast-1.amazonaws.com/aiart/privacy%26policy.html',
  //       );
  //     }
  //     appState.current = nextAppState;
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // const name = useMemo(async () => {
  //   const name = await firestore().collection('Users').doc(UUID).get();
  //   setUserName(a._data.full_name);
  //   return a;
  // }, [UUID]);

  useEffect(() => {
    const userDocumentRef = firestore().collection('Users').doc(UUID);
    const fetchUserInfo = async () => {
      try {
        const userDocumentSnapshot = await userDocumentRef.get();

        if (userDocumentSnapshot.exists) {
          const userData = userDocumentSnapshot.data();

          setUserName(userData.full_name);
          setAvatar(userData.image_avatar);
        } else {
          console.log('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    // Call the fetchUserInfo function to retrieve user information
    fetchUserInfo();
  }, [UUID]);

  const handleSelectPhotosUpload = () => {
    try {
      openModal('OptionsPhotoModal', true, {
        onImageCallback: (image: ImageUploadOptions) => {
          setLoading(true);
          handleImageUpload(image);
          setTimeout(() => {
            setLoading(false);
          }, 4000);
        },
      });
    } catch (error) {
      console.error('Error in handleSelectPhotosUpload:', error);
    }
  };

  const handleImageUpload = async (image) => {
    if (image) {
      try {
        const imageRef = storage().ref(`avatars/${UUID}`);

        // Upload the selected image to Firebase Storage
        await imageRef.putFile(image.path);

        // Get the download URL of the uploaded image
        const downloadURL = await imageRef.getDownloadURL();

        // Update the user's `image_avatar` field in Firestore with the download URL
        await firestore().collection('Users').doc(UUID).update({
          image_avatar: downloadURL,
        });

        // Set the new avatar URL in the component's state
        setAvatar(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleOpenPolicy = () => {
    // setOpenPolicy(true);
    // openInAppBrowser(
    //   'https://triple-privacy.s3.ap-southeast-1.amazonaws.com/aiart/privacy%26policy.html',
    // );
    navigation.navigate('WebViewPage', {
      uri: 'https://sites.google.com/view/phone-tracker-location-policy/home',
    });
  };

  const confirmEdit = async () => {
    setIsShow(false);
    try {
      const userDocRef = firestore().collection('Users').doc(UUID);
      const trimmedNewName = newName.trim();
      if (trimmedNewName === '') {
        console.log('Name not updated');
      } else if (trimmedNewName.length > 20) {
        Alert.alert(t('Error'), t(`Username must be at most 20 characters`), [
          {
            text: t('OK'),
            onPress: () => console.log('error max name'),
            style: 'default',
          },
        ]);
      } else if (!/^[A-Za-z\s]+$/.test(newName)) {
        Alert.alert(
          t('Error'),
          t(`Name contains non-alphabetic characters. Please try again`),
          [
            {
              text: t('OK'),
              onPress: () => console.log('error name '),
              style: 'default',
            },
          ],
        );
      } else {
        await userDocRef.update({ full_name: newName });
        setUserName(newName);
        console.log('Name updated successfully');
      }
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let backButtonPressCount = 0;
      let backButtonPressTimer = null;

      const onBackPress = () => {
        if (backButtonPressCount === 1) {
          // User has pressed the back button twice, so close the app
          // BackHandler.exitApp();
          ExitApp.exitApp();
          return true;
        } else {
          // First back button press, set a timer to reset the count
          backButtonPressCount++;
          backButtonPressTimer = setTimeout(() => {
            backButtonPressCount = 0;
            clearTimeout(backButtonPressTimer);
          }, 2000); // Adjust the timeout as needed (e.g., 2 seconds)
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        backHandler.remove();
      };
    }, []),
  );

  return (
    <ImageBackground
      source={getImage('backgroundProfile')}
      style={{ flex: 1, paddingTop: topInsets }}>
      <SafeAreaView style={{ flex: 1, paddingLeft: 24, paddingRight: 24 }}>
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
        <ScrollView
          bounces={false}
          style={{
            flex: 1,
            paddingHorizontal: 16,
            marginBottom: 20,
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.head}>
              <Text
                style={{
                  color: 'rgba(0, 87, 231, 1)',
                  fontSize: 24,
                  fontWeight: '700',
                  paddingBottom: 20,
                }}>
                {t('Profile')}
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={handleSelectPhotosUpload}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                  }}>
                  {avatar ? (
                    <Image
                      source={{ uri: avatar }}
                      style={{ width: 60, height: 60, borderRadius: 100 }}
                    />
                  ) : (
                    <ShimmerPlaceholder
                      width={60}
                      height={60}
                      style={{ borderRadius: 100 }}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingLeft: 24,
                  }}>
                  {isShow ? (
                    <TextInput
                      style={{
                        backgroundColor: 'transparent',
                        maxWidth: '80%',
                      }}
                      contentStyle={{
                        paddingTop: 24,
                        paddingHorizontal: 0,
                        marginLeft: 8,
                        width: '100%',
                      }}
                      textColor={'#000'}
                      multiline={false}
                      mode='flat'
                      selectionColor={'#0057E7'}
                      onChangeText={(newText) => setNewName(newText)}
                      value={newName}
                    />
                  ) : (
                    <TextInput
                      style={{
                        backgroundColor: 'transparent',
                      }}
                      editable={false}
                      multiline={false}
                      // onChangeText={(newText) => setNewName(newText)}
                      value={userName}
                      contentStyle={{
                        paddingTop: 12,
                        paddingHorizontal: 0,
                        marginLeft: 8,
                        width: '100%',
                      }}
                      theme={{
                        colors: {
                          primary: 'transparent',
                        },
                      }}
                      underlineColor='transparent'
                      textColor={'#000'}
                      mode='outlined'
                      dense={true}
                      outlineColor='transparent'
                    />
                  )}
                  {isShow ? (
                    <TouchableOpacity onPress={confirmEdit}>
                      <IconConfirm width={24} height={24} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{ paddingLeft: 8, marginTop: -8 }}
                      onPress={handleEdit}>
                      <IconEditLocated width={24} height={24} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.topBody}>
              <View style={{ paddingLeft: 24, paddingRight: 24 }}>
                <View
                  style={{
                    borderBottomColor: 'rgba(80, 80, 80, 0.24)',
                    borderBottomWidth: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SelectLanguagePage')}
                    style={styles.item}>
                    <IconLanguage width={34} height={34} />
                    <Text
                      style={{
                        color: 'rgba(0, 0, 0, 1)',
                        fontSize: 16,
                        fontWeight: '700',
                        paddingLeft: 12,
                      }}>
                      {t('Language')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderBottomColor: 'rgba(80, 80, 80, 0.24)',
                    borderBottomWidth: 1,
                  }}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate('HowToUsePage')}>
                    <IconUse width={34} height={34} />
                    <Text
                      style={{
                        color: 'rgba(0, 0, 0, 1)',
                        fontSize: 16,
                        fontWeight: '700',
                        paddingLeft: 12,
                      }}>
                      {t('How to use')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddFriendPage', { isProfile: true })
                  }
                  style={{
                    paddingVertical: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <IconShare width={34} height={34} />
                  <Text
                    style={{
                      color: 'rgba(0, 0, 0, 1)',
                      fontSize: 16,
                      fontWeight: '700',
                      paddingLeft: 12,
                    }}>
                    {t('Share with friends')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomBody}>
              <View style={{ paddingLeft: 24, paddingRight: 24 }}>
                <View
                  style={{
                    borderBottomColor: 'rgba(80, 80, 80, 0.24)',
                    borderBottomWidth: 1,
                  }}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate('FeedbackPage')}>
                    <IconFeedback width={34} height={34} />
                    <Text
                      style={{
                        color: 'rgba(0, 0, 0, 1)',
                        fontSize: 16,
                        fontWeight: '700',
                        paddingLeft: 12,
                      }}>
                      {t('Feedback')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    borderBottomColor: 'rgba(80, 80, 80, 0.24)',
                    borderBottomWidth: 1,
                  }}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate('RateUsPage')}>
                    <IconRate width={34} height={34} />
                    <Text
                      style={{
                        color: 'rgba(0, 0, 0, 1)',
                        fontSize: 16,
                        fontWeight: '700',
                        paddingLeft: 12,
                      }}>
                      {t('Rate us')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={handleOpenPolicy}
                  style={{
                    paddingVertical: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <IconPrivacy width={34} height={34} />
                  <Text
                    style={{
                      color: 'rgba(0, 0, 0, 1)',
                      fontSize: 16,
                      fontWeight: '700',
                      paddingLeft: 12,
                    }}>
                    {t('Privacy policy')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default ProfilePage;

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  topBody: {
    borderColor: 'rgba(80, 80, 80, 0.24)',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 24,
  },
  item: {
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBody: {
    borderColor: 'rgba(80, 80, 80, 0.24)',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 24,
  },
});
