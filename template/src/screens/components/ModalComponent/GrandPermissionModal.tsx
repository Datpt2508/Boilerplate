import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Checkbox, Modal } from 'react-native-paper';

import { getUserInfoByDeviceUUID } from '~/hooks/useFirebaseAction';
import useModalManager from '~/hooks/useModalManager';
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

  const UUID = resultContext?.result?.deviceUUID;
  const friend_name = resultContext?.result?.friendName;
  const friend_UUID = resultContext?.result?.friendUUID;

  const [checkedAutoStart, setCheckedAutoStart] = useState(true);
  const [checkedProtectedApp, setCheckedProtectedApp] = useState(true);
  const [checkedMotionTracking, setCheckedMotionTracking] = useState(true);

  const handleAddFriendTracker = async () => {
    try {
      // Reference to the user document
      const userDocumentRef = firestore().collection('Users').doc(UUID);
      const dataFriend = await getUserInfoByDeviceUUID(friend_UUID);

      // Fetch the existing user data
      userDocumentRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Get the existing friend array or initialize an empty array if it doesn't exist
            const existingFriends = doc.data().friend || [];
            const dataFriendsOfFriend = dataFriend?.friend || [];

            // Check if friend_id already exists in the existingLocators array
            const isFriendAlreadyAdded = existingFriends.some(
              (friend) => friend.friend_id === friend_UUID,
            );

            if (isFriendAlreadyAdded) {
              console.log('Friend already exists in the list.');
            } else {
              // Create the new friend object
              const currentTime = new Date();

              const myDataPushToLocator = {
                friend_id: UUID,
                friend_name: doc.data()?.full_name,
                isFollow: true,
                isLocator: false,
                connect_time: currentTime,
              };

              const newFriend = {
                friend_id: friend_UUID,
                friend_name: friend_name,
                isFollow: false,
                isLocator: true,
                connect_time: currentTime,
              };

              // Check if the friend exists in dataFriendsOfFriend by their friend_id
              const isFriendInDataFriendsOfFriend = dataFriendsOfFriend.some(
                (friend: Friend) => friend.friend_id === UUID,
              );

              if (isFriendInDataFriendsOfFriend) {
                // The friend already exists, so update them
                const updatedDataFriendsOfFriend = dataFriendsOfFriend.map(
                  (friend: Friend) =>
                    friend.friend_id === UUID ? myDataPushToLocator : friend,
                );

                firestore()
                  .collection('Users')
                  .doc(friend_UUID)
                  .update({ friend: updatedDataFriendsOfFriend })
                  .then(() => {
                    console.log('Update existing friend in Locator success!');
                  });
              } else {
                // The friend does not exist, so push them to the array
                dataFriendsOfFriend.push(myDataPushToLocator);

                firestore()
                  .collection('Users')
                  .doc(friend_UUID)
                  .update({ friend: dataFriendsOfFriend })
                  .then(() => {
                    console.log('Add new friend to Locator success!');
                  });
              }

              // Add the new friend to the existing friends array
              existingFriends.push(newFriend);

              // Update the user document with the modified friend array
              userDocumentRef
                .update({ friend: existingFriends })
                .then(() => {
                  console.log('Add friend success!');
                  onCloseModal();
                  AsyncStorage.setItem('isListLocated', 'true');
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'LocatedNavigator' }],
                  });
                })
                .catch((error) => {
                  console.error('Error updating user document:', error);
                });
            }
          } else {
            console.log('User document not found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user document:', error);
        });
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  return (
    <View
      style={{
        width: SCREEN_WIDTH - 50,
        height: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
      }}>
      <Text style={styles.h6}>{t('Grand permission!')}</Text>

      <Text style={styles.large}>
        {t('To make sure Phone Tracker work properly')}
      </Text>

      <View style={styles.button}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'SFProDisplay-Medium',
              color: '#00000090',
            }}>
            {t('Auto start')}:
          </Text>
          <Checkbox.Android
            status={checkedAutoStart ? 'checked' : 'unchecked'}
            color='#0057E7'
            uncheckedColor='#0057E7'
            onPress={() => {
              setCheckedAutoStart(!checkedAutoStart);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'SFProDisplay-Medium',
              color: '#00000090',
            }}>
            {t('Protected app')}:
          </Text>
          <Checkbox.Android
            status={checkedProtectedApp ? 'checked' : 'unchecked'}
            color='#0057E7'
            uncheckedColor='#0057E7'
            onPress={() => {
              setCheckedProtectedApp(!checkedProtectedApp);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'SFProDisplay-Medium',
              color: '#00000090',
            }}>
            {t('Motion Tracking')}:
          </Text>
          <Checkbox.Android
            status={checkedMotionTracking ? 'checked' : 'unchecked'}
            color='#0057E7'
            uncheckedColor='#0057E7'
            onPress={() => {
              setCheckedMotionTracking(!checkedMotionTracking);
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text
          onPress={handleAddFriendTracker}
          style={{
            color: '#007AFF',
            fontSize: 18,
            fontWeight: '400',
            fontFamily: 'SFProDisplay-Medium',
          }}>
          {t('Deny')}
        </Text>
        <TouchableOpacity
          onPress={handleAddFriendTracker}
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
            {t('Accept')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GrandPermissionModal = (): JSX.Element | null => {
  const { isOpen, closeModal, getParams } = useModalManager(
    'GrandPermissionModal',
  );
  const visible = isOpen('GrandPermissionModal');

  const onClose = (): void => {
    closeModal('GrandPermissionModal');
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

export default GrandPermissionModal;
