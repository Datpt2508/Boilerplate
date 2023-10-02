import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modal } from 'react-native-paper';

import useModalManager from '~/hooks/useModalManager';

import { useAppTheme } from '~/resources/theme';

const ModalContent = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}): JSX.Element => {
  const theme = useAppTheme();
  const { t } = useTranslation();

  const handleGoBack = () => {
    onCloseModal();
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F222A',
        paddingTop: 40,
        // width: Dimensions.get('screen').width - 40,
        paddingHorizontal: 32,
        marginHorizontal: 40,
        borderRadius: 16,
      }}>
      <Text
        style={{
          color: '#F5484A',
          fontFamily: 'Urbanist-Bold',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 16,
        }}>
        {t('Connection Error!!')}
      </Text>

      <Text
        style={{
          fontFamily: 'Urbanist',
          marginBottom: 20,
          fontSize: 16,
          fontWeight: '400',
          textAlign: 'center',
          color: 'white',
        }}>
        {t(
          'Oops! Looks like your device is not connected to the Internet. Please check your network and try again!',
        )}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          marginBottom: 32,
        }}>
        <TouchableOpacity
          style={{
            height: 58,
            width: '100%',
            backgroundColor: '#0057E7',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            marginLeft: 8,
          }}
          onPress={handleGoBack}>
          <Text
            style={{
              color: theme.colors.white,
              fontFamily: 'Urbanist-SemiBold',
              fontSize: 16,
              fontWeight: '700',
            }}>
            {t('OK')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NetWorkDisableModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('NetWorkDisableModal');
  const visible = isOpen('NetWorkDisableModal');

  const onClose = (): void => {
    closeModal('NetWorkDisableModal');
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}
      theme={{
        colors: {
          backdrop: 'rgba(0, 0, 0, 0.7)',
        },
      }}>
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

export default NetWorkDisableModal;
