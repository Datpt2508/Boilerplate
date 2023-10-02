import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Modal } from 'react-native-paper';

import useModalManager from '~/hooks/useModalManager';
import { useOrientation } from '~/hooks/useOrientation';

import getImage from '~/libs/getImage';

import Button from '~/base/Button';
import { H4, Large } from '~/base/Typography';
import { BottomTabNavigatorNavProps } from '~/navigation/BottomTabNavigator';

const SuccessModalContent = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}): JSX.Element => {
  const { ORIENTATION_WIDTH } = useOrientation();
  const navigation = useNavigation<BottomTabNavigatorNavProps>();
  const { t } = useTranslation();

  const handleViewArtwork = () => {
    navigation.navigate('BottomTabNavigator', { screen: 'ProfileNavigator' });
    onCloseModal();
  };
  const modalContainer = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: ORIENTATION_WIDTH / 1.3,
      backgroundColor: '#1F222A',
      paddingVertical: 16,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      // flex: 1,
    }),
    [ORIENTATION_WIDTH],
  );

  return (
    <SafeAreaView style={modalContainer}>
      <FastImage
        source={getImage('success')}
        style={{
          // flex: 1,
          marginTop: 4,
          width: ORIENTATION_WIDTH / 2.4,
          aspectRatio: 1,
          // width: 200,
          // height: 300,
        }}
        resizeMode='contain'
      />
      <View style={styles.viewH6}>
        <H4 style={styles.h6}>{t('Successful!')}</H4>
      </View>
      <View style={styles.viewH6}>
        <Large style={styles.large}>
          {t('Your avatar has been successfully generated!')}
        </Large>
      </View>
      <View style={styles.button}>
        <Button
          type='modal'
          radius='many'
          textColor='white'
          onPress={handleViewArtwork}>
          View in Profile
        </Button>
      </View>
    </SafeAreaView>
  );
};

const SuccessModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('SuccessModal');
  const visible = isOpen('SuccessModal');

  const onClose = (): void => {
    closeModal('SuccessModal');
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
      {visible ? <SuccessModalContent onCloseModal={onClose} /> : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewH6: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
  },
  h6: {
    fontWeight: '700',
    color: '#0057E7',
  },
  button: {
    marginTop: 24,
    paddingBottom: 12,
  },
  large: {
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Urbanist-Regular',
  },
  containerButton: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default SuccessModal;
