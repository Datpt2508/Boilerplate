import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
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
  const actionMethod = usePreferenceActionsContext();
  const resultContext = usePreferenceContext();
  const { getParams } = useModalManager();
  const friendName = getParams('EditNameModal')?.nameFriend;
  const friendAvatar = getParams('EditNameModal')?.avatarFriend;
  const friendUUID = getParams('EditNameModal')?.UUIDFriend;
  const listFriend = getParams('EditNameModal')?.listFriend;

  // const [userName, setUserName] = useState(friendName);
  const [currentInput, setCurrentInput] = useState(friendName);

  const UUID = resultContext?.result?.deviceUUID;

  const handleEditNameFriend = async () => {
    try {
      const userDocRef = firestore().collection('Users').doc(UUID);
      const userDocumentSnapshot = await userDocRef.get();

      if (userDocumentSnapshot.exists) {
        const userData = userDocumentSnapshot.data();
        if (userData) {
          const updatedFriends = userData.friend.map((friend: Friend) => {
            if (friend.friend_id === friendUUID) {
              friend.friend_name = currentInput;
            }
            return friend;
          });
          if (!currentInput.trim()) {
            Alert.alert(t('Error'), t('Username cannot be empty'), [
              {
                text: t('OK'),
                onPress: () => console.log('username cannot empty'),
                style: 'default',
              },
            ]);
            return;
          } else if (currentInput.length > 20) {
            Alert.alert(
              t('Error'),
              t(`Username must be at most 20 characters`),
              [
                {
                  text: t('OK'),
                  onPress: () => console.log('error max name'),
                  style: 'default',
                },
              ],
            );
            return;
          }
          // Update the user's friend list in Firestore
          await userDocRef.update({ friend: updatedFriends });

          onCloseModal();
          console.log('Update friend name success');
        }
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error updating friend name:', error);
    }
  };

  const handleTextInputChange = (newText: string) => {
    setCurrentInput(newText);
  };

  return (
    <View
      style={{
        width: SCREEN_WIDTH - 50,
        height: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
      }}>
      <View
        style={{
          flex: 0.7,
          backgroundColor: '#DADADA',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ height: 80, width: 80 }}>
          <Image
            source={{ uri: friendAvatar }}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 100,
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <TextInput
          style={{
            backgroundColor: 'transparent',
            maxWidth: '80%',
            marginBottom: 12,
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
          defaultValue={friendName}
          value={currentInput}
          onChangeText={handleTextInputChange}
        />
        <Text style={{ color: 'rgba(119, 124, 126, 1)', marginBottom: 12 }}>
          {t('Edit display name')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
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
              borderColor: '#007AFF',
              borderWidth: 1,
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
            onPress={handleEditNameFriend}
            style={{
              backgroundColor: '#0057E7',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 16,
              borderRadius: 4,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'SFProDisplay-Medium',
                fontWeight: '700',
                fontSize: 18,
              }}>
              {t('Done')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const EditNameModal = (): JSX.Element | null => {
  const { isOpen, closeModal, getParams } = useModalManager('EditNameModal');
  const visible = isOpen('EditNameModal');

  const onClose = (): void => {
    closeModal('EditNameModal');
  };

  // const handleEditNameCallback = (item: any) => {
  //   getParams('AddLocatedModal')?.onEditNameCallback?.(item);
  //   closeModal('AddLocatedModal');
  // };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}>
      {visible ? (
        <ModalContent
          onCloseModal={onClose}
          // handleEditNameCallback={handleEditNameCallback}
        />
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  h6: {
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 20,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    paddingBottom: 12,
  },
  large: {
    fontWeight: '400',
    color: '#666666',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Medium',
  },
});

export default EditNameModal;
