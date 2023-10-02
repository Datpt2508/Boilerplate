import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Checkbox, Modal, TextInput } from 'react-native-paper';

import { getUserInfoByDeviceUUID } from '~/hooks/useFirebaseAction';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import { BottomTabNavigatorNavProps } from '~/navigation/BottomTabNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ModalContent = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}): JSX.Element => {
  const navigation = useNavigation<BottomTabNavigatorNavProps>();
  const { t } = useTranslation();
  const resultContext = usePreferenceContext();
  const { getParams, openModal } = useModalManager();
  const UUID = resultContext?.result?.deviceUUID;

  const nameFriend = getParams('ConfirmDeleteFriendModal')?.nameFriend;
  const UUIDFriend = getParams('ConfirmDeleteFriendModal')?.UUIDFriend;

  const handleConfirmDelete = async () => {
    const userDocRef = firestore().collection('Users').doc(UUID);
    const userDocumentSnapshot = await userDocRef.get();

    if (userDocumentSnapshot.exists) {
      const userData = userDocumentSnapshot.data();
      if (userData) {
        const newDataFriend = [...userData.friend];

        // Find the index to delete
        const indexToDelete = newDataFriend.findIndex(
          (item) => item.friend_id === UUIDFriend,
        );

        if (indexToDelete !== -1) {
          newDataFriend.splice(indexToDelete, 1);

          // Update the user's document with the updated friend data
          await userDocRef.update({
            friend: newDataFriend,
          });

          firestore()
            .collection('Users')
            .doc(UUIDFriend)
            .get()
            .then((friendDoc) => {
              const friendData = friendDoc.data();

              if (friendData && friendData.friend) {
                const newDataOfFriend = [...friendData.friend];

                const friendIndex = newDataOfFriend.findIndex(
                  (friend: Friend) => friend.friend_id === UUID,
                );

                if (friendIndex !== -1) {
                  newDataOfFriend.splice(friendIndex, 1);
                }

                firestore()
                  .collection('Users')
                  .doc(UUIDFriend)
                  .update({
                    friend: newDataOfFriend,
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

          onCloseModal();
          navigation.goBack();
          console.log('Successfully deleted the friend');
        } else {
          console.log('Friend not found in userData');
        }
      }
    } else {
      console.log('User document does not exist.');
    }
  };

  return (
    <View
      style={{
        width: SCREEN_WIDTH - 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
      }}>
      <Text
        style={{
          color: '#107E56',
          marginBottom: 12,
          fontSize: 20,
          fontWeight: '700',
          fontFamily: 'SFProDisplay-Medium',
        }}>
        {t('Confirm')}
      </Text>
      <Text style={{ color: 'rgba(119, 124, 126, 1)', marginBottom: 20 }}>
        {t(`Are you sure you want to stop tracking location of `)}
        <Text style={{ fontStyle: 'italic' }}>{nameFriend}</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={onCloseModal}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 16,
            borderRadius: 4,
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              color: '#007AFF',
              fontSize: 18,
              fontWeight: '400',
              fontFamily: 'SFProDisplay-Medium',
            }}>
            {t('Cancel')}
          </Text>
        </TouchableOpacity>

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
  );
};

const ConfirmDeleteFriendModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('ConfirmDeleteFriendModal');
  const visible = isOpen('ConfirmDeleteFriendModal');

  const onClose = (): void => {
    closeModal('ConfirmDeleteFriendModal');
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}>
      {visible ? <ModalContent onCloseModal={onClose} /> : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConfirmDeleteFriendModal;
