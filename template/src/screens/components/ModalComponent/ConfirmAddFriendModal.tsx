import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
  const { getParams, openModal } = useModalManager();
  const friendName = getParams('ConfirmAddFriendModal')?.nameFriend;
  console.log(
    '🚀 ~ file: ConfirmAddFriendModal.tsx:30 ~ friendName:',
    friendName,
  );

  const handleAddFriend = () => {
    onCloseModal();
    openModal('GrandPermissionModal', true);
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
        {t(`Are you sure you want to accept `)}
        <Text style={{ fontStyle: 'italic' }}>{friendName}</Text>
        <Text>{t(` invitation?`)}</Text>
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
          onPress={handleAddFriend}
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

const ConfirmAddFriendModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('ConfirmAddFriendModal');
  const visible = isOpen('ConfirmAddFriendModal');

  const onClose = (): void => {
    closeModal('ConfirmAddFriendModal');
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

export default ConfirmAddFriendModal;
