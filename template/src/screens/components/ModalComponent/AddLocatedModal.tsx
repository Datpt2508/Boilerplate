import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Modal } from 'react-native-paper';

import { getUserInfoByDeviceUUID } from '~/hooks/useFirebaseAction';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import IconClose from '~/resources/Icons/IconClose';

import ButtonCustom from '~/base/ButtonCustom';
import { BottomTabNavigatorNavProps } from '~/navigation/BottomTabNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ModalContent = ({
  onCloseModal,
  onPressInvited,
}: {
  onCloseModal: () => void;
  onPressInvited: (data: string) => void;
}): JSX.Element => {
  const navigation = useNavigation<BottomTabNavigatorNavProps>();
  const { t } = useTranslation();
  const resultContext = usePreferenceContext();
  const actionMethod = usePreferenceActionsContext();

  const UUID = resultContext?.result?.deviceUUID;
  const [value, setValue] = useState('');
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setIsNextButtonEnabled(value.length === 6);
  }, [value]);

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
      if (UUID === deviceUUID?.UUID) {
        Alert.alert(t('Warning'), t(`You can't add yourself to be located`), [
          {
            text: t('OK'),
            onPress: () => console.log('error add'),
            style: 'default',
          },
        ]);
        return;
      } else {
        return deviceUUID;
      }
    } catch (error) {
      console.error('Error checking invite code:', error);
      return null; // Handle the error as needed
    }
  };

  const handleCheckCodeInvite = () => {
    checkInviteCode(value).then(async (deviceUUID) => {
      if (deviceUUID) {
        // actionMethod?.setActionFriendUUID?.(deviceUUID.UUID);
        const userDocumentRef = await getUserInfoByDeviceUUID(UUID);
        const dataFriend = await getUserInfoByDeviceUUID(deviceUUID.UUID);

        const existingFriends = userDocumentRef?.friend || [];
        const dataFriendsOfFriend = dataFriend?.friend || [];

        const isFriendAlreadyAdded = existingFriends.some(
          (friend: Friend) => friend.friend_id === deviceUUID.UUID,
        );

        const existingFriend = existingFriends.find(
          (friend: Friend) => friend.friend_id === deviceUUID.UUID,
        );

        const currentTime = new Date();

        const myDataPushToLocator = {
          friend_id: UUID,
          friend_name: userDocumentRef?.full_name,
          isFollow: true,
          isLocator: false,
          connect_time: currentTime,
        };

        if (isFriendAlreadyAdded) {
          const isLocator = existingFriend.isLocator;

          if (!isLocator) {
            existingFriend.isLocator = true;
            existingFriend.connect_time = new Date();

            const updatedFriends = existingFriends.map((friend: Friend) =>
              friend.friend_id === deviceUUID.UUID ? existingFriend : friend,
            );

            // Update the user document with the modified friend array
            firestore()
              .collection('Users')
              .doc(UUID)
              .update({ friend: updatedFriends })
              .then(() => {
                onPressInvited(dataFriend?.full_name);
                console.log('isLocator updated to success');
              });

            //Update the info to Locator
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
                .doc(deviceUUID.UUID)
                .update({ friend: updatedDataFriendsOfFriend })
                .then(() => {
                  console.log('Update existing friend in Locator success!');
                });
            } else {
              // The friend does not exist, so push them to the array
              dataFriendsOfFriend.push(myDataPushToLocator);

              firestore()
                .collection('Users')
                .doc(deviceUUID.UUID)
                .update({ friend: dataFriendsOfFriend })
                .then(() => {
                  console.log('Add new friend to Locator success!');
                });
            }
          } else {
            Alert.alert(
              t('Warning'),
              t(`This Locator is already on your list`),
              [
                {
                  text: t('OK'),
                  onPress: () => console.log('add locator is exist'),
                  style: 'default',
                },
              ],
            );
          }
        } else {
          const newFriend = {
            friend_id: deviceUUID.UUID,
            friend_name: dataFriend?.full_name,
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
              .doc(deviceUUID.UUID)
              .update({ friend: updatedDataFriendsOfFriend })
              .then(() => {
                console.log('Update existing friend in Locator success!');
              });
          } else {
            // The friend does not exist, so push them to the array
            dataFriendsOfFriend.push(myDataPushToLocator);

            firestore()
              .collection('Users')
              .doc(deviceUUID.UUID)
              .update({ friend: dataFriendsOfFriend })
              .then(() => {
                console.log('Add new friend to Locator success!');
              });
          }

          // Add the new friend to the existing friends array
          existingFriends.push(newFriend);

          // Update the user document with the modified friend array
          firestore()
            .collection('Users')
            .doc(UUID)
            .update({ friend: existingFriends })
            .then(() => {
              onPressInvited(dataFriend?.full_name);
              console.log('Add friend success!');
            });
        }
      } else {
        onPressInvited('false');
        console.log('No matching code found.');
      }
    });
  };

  return (
    <View
      style={{
        width: SCREEN_WIDTH - 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
      }}>
      <Text style={styles.h6}>{t('Enter invite code')}</Text>
      <Pressable
        style={{ position: 'absolute', top: 8, right: 8 }}
        onPress={onCloseModal}>
        <IconClose height={28} width={28} />
      </Pressable>
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
      <ButtonCustom
        onPress={handleCheckCodeInvite}
        title={t('Join')}
        disabled={!isNextButtonEnabled}
        style={{ width: 120, height: 48, alignSelf: 'center' }}
      />
    </View>
  );
};

const AddLocatedModal = (): JSX.Element | null => {
  const { isOpen, closeModal, getParams } = useModalManager('AddLocatedModal');
  const visible = isOpen('AddLocatedModal');

  const onClose = (): void => {
    closeModal('AddLocatedModal');
  };

  const handleInviteCallback = (item: any) => {
    getParams('AddLocatedModal')?.onInvitedCallback?.(item);
    closeModal('AddLocatedModal');
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      theme={{
        colors: {
          backdrop: 'rgba(0, 0, 0, 0.8)',
        },
      }}
      contentContainerStyle={styles.modal}>
      {visible ? (
        <ModalContent
          onPressInvited={handleInviteCallback}
          onCloseModal={onClose}
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
  codeFieldRoot: { marginTop: 10, marginBottom: 30 },
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

export default AddLocatedModal;
