import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import Modal from 'react-native-modal';

import useModalManager from '~/hooks/useModalManager';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconClose from '~/resources/Icons/IconClose';
import IconConfirmAdd from '~/resources/Icons/IconConfirmAdd';

import { GoogleAdsIds } from '~/types/GoogleAds';

import LocatedItem from './LocatedItem';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ListLocatedScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const resultContext = usePreferenceContext();
  const UUID = resultContext?.result?.deviceUUID;

  const [modalVisible, setModalVisible] = useState(false);

  const [UUIDDelete, setUUIDDelete] = useState();
  const [dataFriend, setDataFriend] = useState([]);

  const [dataTotal, setDataTotal] = useState('');
  const [nameDelete, setNameDelete] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const { openModal } = useModalManager();

  // const { isClosed, load } = useInterstitialAd(GoogleAdsIds.INTERSTITIAL, {
  //   requestNonPersonalizedAdsOnly: true,
  // });

  const DeleteItem = async (item: any, index) => {
    setNameDelete(item?.friend_name);
    setModalVisible(true);
    // setIndexDelete(index);
    setUUIDDelete(item?.friend_id);
  };

  const handleConfirmDelete = () => {
    setModalVisible(false);
    const userDocRef = firestore().collection('Users').doc(UUID);
    const indexToDelete = dataFriend.findIndex(
      (item) => item.friend_id === UUIDDelete,
    );

    // Create a new array with the item removed
    const newDataFriend = [...dataFriend];
    newDataFriend.splice(indexToDelete, 1);
    // setDataFriend(newDataFriend);
    userDocRef
      .update({
        friend: newDataFriend,
      })
      .then(() => {
        // const newData = dataFriend.filter(
        //   (item) => item.friend_id !== UUIDDelete,
        // );
        // // setDataFriend(newData);
        setDataFriend(newDataFriend);
        firestore()
          .collection('Users')
          .doc(UUIDDelete)
          .get()
          .then((friendDoc) => {
            const friendData = friendDoc.data();

            if (friendData && friendData.friend) {
              // Find the index of your UUID in the friend's friend array
              const friendIndex = friendData.friend.findIndex(
                (friend: Friend) => friend.friend_id === UUID,
              );

              friendData.friend[friendIndex].isFollow = false;

              // Update the friend's document with the modified friend array
              firestore()
                .collection('Users')
                .doc(UUIDDelete)
                .update({
                  friend: friendData.friend,
                })
                .then(() => {
                  console.log(
                    'Update isFollow to false in friend document success!',
                  );
                })
                .catch((error) => {
                  console.error('Error updating friend document:', error);
                });
            } else {
              console.log('Friend document does not have friend data.');
            }
          })
          .catch((error) => {
            console.error('Error fetching friend document:', error);
          });

        console.log('Delete locator successful');
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật danh sách bạn bè:', error);
      });
  };

  useEffect(() => {
    const userRef = firestore().collection('Users').doc(UUID);

    const unsubscribe = userRef.onSnapshot((documentSnapshot) => {
      const userData = documentSnapshot.data();

      if (userData && userData.friend) {
        const friendsWithIsFollowFalse = userData.friend.filter(
          (friendData: Friend) => friendData.isLocator === true,
        );

        setDataFriend(friendsWithIsFollowFalse);
      } else {
        setDataFriend([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   load();
  // }, [isClosed, load]);

  const handleAdd = () => {
    try {
      openModal('AddLocatedModal', true, {
        onInvitedCallback: (data: string) => {
          if (data === 'false') {
            console.log('data False');
            setErrorMessage(true);
            setTimeout(() => {
              setErrorMessage(false);
            }, 3000);
          } else {
            setDataTotal(data);
            setTimeout(() => {
              setDataTotal('');
            }, 3000);
          }
        },
      });
    } catch (error) {
      console.error('Error in handle Add Friend:', error);
    }
  };

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

  return (
    <ImageBackground source={getImage('backgroundProfile')} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <>
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
                bottom: 150,
                alignSelf: 'center',
                width: '100%',
              }}>
              <IconClose height={12} />
              <Text style={{ marginLeft: 8, color: '#000' }}>
                {t('Invalid code. Please recheck and try again')}
              </Text>
            </View>
          )}
          {dataTotal && (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 4,
                borderColor: '#B7EB8F',
                backgroundColor: '#F6FFED',
                padding: 8,
                position: 'absolute',
                bottom: 150,
                alignSelf: 'center',
              }}>
              <IconConfirmAdd height={20} />
              <Text style={{ marginHorizontal: 8, color: '#000' }}>
                {t(
                  `Great! - Start safe location sharing with ${dataTotal} now!`,
                )}
              </Text>
            </View>
          )}

          <View
            style={{
              width: '80%',
              position: 'absolute',
              backgroundColor: 'rgba(0, 87, 231, 1)',
              borderRadius: 4,
              bottom: 50,
              alignItems: 'center',
              zIndex: 2,
            }}>
            <TouchableOpacity
              onPress={handleAdd}
              style={{
                paddingVertical: 12,
                width: '100%',
                borderRadius: 4,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: 18,
                  lineHeight: 32,
                  fontFamily: 'SFProDisplay-Medium',
                }}>
                {t('Add Locator')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
        <Modal
          isVisible={modalVisible}
          animationOutTiming={100}
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: '#FFF',
              width: SCREEN_WIDTH - 32,
              alignSelf: 'center',
              padding: 16,
            }}>
            <Text
              style={{
                color: '#107E56',
                fontFamily: 'SFProDisplay-Medium',
                fontWeight: '700',
                fontSize: 20,
                marginBottom: 16,
              }}>
              {t('Confirm')}
            </Text>
            <Text style={{ color: '#000', marginBottom: 30 }}>
              {t(`Are you sure you want to remove `)}
              {nameDelete}
              <Text>{t(' from locator list?')}</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                onPress={() => setModalVisible(false)}
                style={{
                  color: '#007AFF',
                  fontSize: 18,
                  fontWeight: '400',
                  fontFamily: 'SFProDisplay-Medium',
                }}>
                {t('Cancel')}
              </Text>
              <TouchableOpacity
                onPress={handleConfirmDelete}
                style={{
                  backgroundColor: '#0057E7',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 16,
                  borderRadius: 4,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'SFProDisplay-Medium',
                    fontWeight: '700',
                    fontSize: 18,
                  }}>
                  {t('Confirm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ScrollView
          bounces={false}
          style={{
            flex: 1,
            width: '100%',
            marginBottom: 150,
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
                {t('Be Located')}
              </Text>
            </View>
            {dataFriend.map((item, index) => (
              <View key={index} style={{ width: '100%', paddingBottom: 12 }}>
                <LocatedItem
                  data={item}
                  onPressDeleteCallback={() => DeleteItem(item, index)}
                  listFriend={dataFriend}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* {isShowAdd && (
        <ModalLocated onClose={closeModal} onDataSend={handleDataFromChild} />
      )} */}
    </ImageBackground>
  );
};
export default ListLocatedScreen;

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    paddingVertical: 12,
  },
});
