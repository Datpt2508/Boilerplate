import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  AppState,
  Dimensions,
  ImageBackground,
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';

import { useTopInset } from '~/hooks/useInset';

import getImage from '~/libs/getImage';

import IconComment from '~/resources/Icons/IconAddFriend/IconComment';
import IconEmail from '~/resources/Icons/IconAddFriend/IconEmail';
import IconMore from '~/resources/Icons/IconAddFriend/IconMore';
import IconSend from '~/resources/Icons/IconAddFriend/IconSend';
import IconTelegram from '~/resources/Icons/IconAddFriend/IconTelegram';
import IconTwitter from '~/resources/Icons/IconAddFriend/IconTwitter';
import IconWhatApp from '~/resources/Icons/IconAddFriend/IconWhatApp';
import IconBack from '~/resources/Icons/IconBack';
import IconLogo from '~/resources/Icons/IconLogo';
import IconLocatePhone from '~/resources/Icons/IconPhoneTrack/IconLocatePhone';

import Divider from '~/base/Divider';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const AddFriendPage = ({ route }) => {
  const { t } = useTranslation();
  const topInsets = useTopInset();
  const isProfile = route.params?.isProfile;

  const MenuChoose = [
    {
      title: t('Chat'),
      icon: <IconComment />,
    },
    {
      title: t('Telegram'),
      icon: <IconTelegram />,
    },
    {
      title: t('Twitter'),
      icon: <IconTwitter />,
    },
    {
      title: t('Whatsapp'),
      icon: <IconWhatApp />,
    },
    {
      title: t('E-mail'),
      icon: <IconEmail />,
    },
    {
      title: t('More'),
      icon: <IconMore />,
    },
  ];
  const [arrayContact, setArrayContact] = useState([]);
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [isPermissionDeny, setIsPermissionDeny] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [selectedItem, setSelectedItem] = useState<number>();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      )
        appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBack = () => {
    isProfile
      ? navigation.goBack()
      : navigation.navigate('BottomTabNavigator', {
          screen: 'HomeNavigator',
        });
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        .then((res) => {
          if (res === 'granted') {
            setIsPermissionDeny(false);
            Contacts.getAll()
              .then((contacts) => {
                const sortedContacts = contacts.sort((a, b) =>
                  a.displayName.localeCompare(b.displayName),
                );
                setArrayContact(sortedContacts);
              })
              .catch((e) => {
                console.log('Permission error', e);
              });
          } else {
            setIsPermissionDeny(true);
          }
        })
        .catch((error) => {
          console.error('Permission error: ', error);
        });
    } else {
      Contacts.getAll()
        .then((contacts) => {
          setArrayContact(contacts);
        })
        .catch((err) => {
          console.log('Permission contact', err);
          Alert.alert(t('Permission contact denied'), err, [
            {
              text: t('Open setting'),
              onPress: () => {
                Linking.openURL('app-settings:');
              },
            },
          ]);
          // Linking.openURL('app-settings:');
        });
    }
  }, [appStateVisible]);

  const body = t(
    `If you want to see the location of the person you are looking for, you can use this application.\n\n`,
  );
  const link =
    'https://play.google.com/store/apps/details?id=8379237/ref=alhylu';
  const subject = t('Join with me');
  const separator = Platform.OS === 'ios' ? '&' : '?';

  const handleSelectApp = (index: number) => {
    if (index !== 5) {
      setSelectedItem(index);
    } else {
      Share.open({
        title: t('Share invite app'),
        message: body,
        url: link,
        filename: t('Join with me'), // only for base64 file in Android
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }
  };

  const handleSend = (item: any) => {
    const phoneNumber = item[0]?.number;

    if (selectedItem !== undefined) {
      const selectedApp = MenuChoose[selectedItem];
      console.log(
        '🚀 ~ file: AddFriendPage.tsx:235 ~ handleSend ~ item:',
        selectedApp.title,
        item[0]?.number,
      );
      switch (selectedApp.title) {
        case t('Chat'):
          Linking.openURL(`sms:${phoneNumber}${separator}body=${body + link}`);
          break;
        case t('Telegram'):
          Linking.openURL(`tg://resolve`).catch(() => {
            Alert.alert(t('Make sure Telegram installed on your device'));
          });
          break;
        case t('Twitter'):
          Linking.openURL('twitter://').catch(() => {
            Alert.alert(t('Make sure Twitter installed on your device'));
          });
          break;
        case t('Whatsapp'):
          Linking.openURL(
            `whatsapp://send?phone=${phoneNumber}&text=${body + link}`,
          ).catch(() => {
            Alert.alert(t('Make sure WhatsApp installed on your device'));
          });
          break;
        case t('E-mail'):
          Linking.openURL(
            `mailto:?subject=${subject}&body=${body + link}`,
          ).catch(() => {
            Alert.alert(t('Make sure Email installed on your device'));
          });
          break;
        default:
          break;
      }
    }
  };

  return (
    <ImageBackground
      source={getImage('imageBackgroundApp')}
      resizeMode='cover'
      style={[styles.bgImage, { paddingTop: topInsets }]}>
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
          <Text style={styles.title}>
            {isProfile ? t('Share with friend') : t('Add friend')}
          </Text>
          <Text style={{ width: 24 }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detail}>
            <View style={styles.viewDesDetail}>
              <IconLogo height={52} width={52} />
              <View style={{ width: '100%', marginLeft: 20 }}>
                <Text
                  style={{
                    width: '80%',
                    fontSize: 16,
                    fontWeight: '700',
                    fontFamily: 'SFProDisplay-Medium',
                    color: '#262626',
                  }}>
                  {body}
                </Text>
                <Text
                  style={{
                    width: '80%',
                    fontSize: 16,
                    fontWeight: '400',
                    color: '#262626',
                    marginTop: 4,
                  }}>
                  {link}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detail}>
            <View style={{ margin: 20 }}>
              <View style={styles.viewDes}>
                {MenuChoose.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        // marginRight: 13,
                        justifyContent: 'center',
                        // alignItems: 'center',
                      }}
                      onPress={() => handleSelectApp(index)}>
                      <View
                        style={[
                          {
                            height: 38,
                            width: 38,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: '#BDBDBD40',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                          index === selectedItem
                            ? { backgroundColor: '#0057E720' }
                            : null,
                        ]}>
                        {item?.icon}
                      </View>
                      <Text
                        style={[
                          {
                            width: 40,
                            marginTop: 4,
                            fontSize: 10,
                            textAlign: 'center',
                          },
                          index === selectedItem
                            ? { color: '#0057E7', fontWeight: '700' }
                            : { color: '#3D5A80', fontWeight: '400' },
                        ]}
                        numberOfLines={1}>
                        {item?.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {isPermissionDeny ? (
                <View style={{ marginTop: 24 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000000',
                      fontFamily: 'SFProDisplay-Medium',
                      textAlign: 'center',
                      marginBottom: 20,
                    }}>
                    {t(
                      'No Friend data is available. Please allow contacts access',
                    )}
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openSettings()}
                    style={{
                      backgroundColor: '#DCECF1',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 8,
                      width: 150,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#0057E7',
                        fontFamily: 'SFProDisplay-Medium',
                        fontWeight: '600',
                      }}>
                      {t('Give Permission')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ marginTop: 24 }}>
                  <Text style={styles.contact}>{t('From your contacts')}</Text>
                  <View
                    style={{
                      marginTop: 12,
                      // marginBottom: Platform.OS === 'android' ? 24 : 0,
                    }}>
                    {arrayContact.map((item, index) => {
                      return (
                        <View key={index}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: 8,
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <FastImage
                                source={getImage('avatarFriend')}
                                style={styles.avatar}
                                resizeMode='contain'
                              />
                              <View
                                style={{
                                  flex: 1,
                                  maxWidth: SCREEN_WIDTH * 0.6,
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={styles.name}
                                  ellipsizeMode='tail'>
                                  {item?.displayName}
                                </Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={() => handleSend(item?.phoneNumbers)}>
                              <IconSend />
                            </TouchableOpacity>
                          </View>
                          {index !== arrayContact?.length - 1 && (
                            <Divider style={styles.divider} />
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  margin: {
    marginHorizontal: 24,
    marginBottom: Platform.OS === 'ios' ? 12 : 32,
    marginTop: Platform.OS === 'ios' ? 12 : 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0057E7',
  },
  detail: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginTop: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#50505024',
    marginBottom: 20,
  },
  viewDes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewDesDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  contact: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  avatar: {
    height: 40,
    width: 40,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#262626',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#BDBDBD24',
    marginBottom: 10,
  },
});
export default AddFriendPage;
