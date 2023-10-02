import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modal } from 'react-native-paper';

import useModalManager from '~/hooks/useModalManager';
import { useOrientation } from '~/hooks/useOrientation';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';

import { useAppTheme } from '~/resources/theme';

const ExampleModalContent = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}): JSX.Element => {
  const actionMethod = usePreferenceActionsContext();
  const [username, setUserName] = useState('');
  const { isPortrait, ORIENTATION_WIDTH, ORIENTATION_HEIGH } = useOrientation();
  const [showAlert, setShowAlert] = useState(false);
  const theme = useAppTheme();
  const { t } = useTranslation();

  const modalContainer = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: isPortrait ? ORIENTATION_WIDTH / 1.2 : ORIENTATION_HEIGH / 1.2,

      paddingVertical: 16,
      borderRadius: 12,
    }),
    [ORIENTATION_WIDTH],
  );

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      extraScrollHeight={Platform.select({
        android: 30,
        ios: isPortrait ? 60 : 40,
      })}
      enableOnAndroid={true}
      keyboardShouldPersistTaps='handled'
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.keyboardAwareContent}>
      <View style={modalContainer}>
        <Text style={styles.textTitle}>{t('Save Information')}</Text>
        <View style={styles.viewInfo}>
          {showAlert ? (
            <TextInput
              autoFocus={true}
              style={styles.inputInformationAlert}
              onChangeText={(e) => setUserName(e)}
            />
          ) : (
            <TextInput
              style={styles.inputInformation}
              onChangeText={(e) => setUserName(e)}
            />
          )}
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity onPress={onCloseModal}>
            <Text>{t('Save')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCloseModal}>
            <Text>{t('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const ExampleModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('ExampleModal');
  const visible = isOpen('ExampleModal');

  const onClose = (): void => {
    closeModal('ExampleModal');
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}>
      {visible ? <ExampleModalContent onCloseModal={onClose} /> : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',

    marginBottom: 16,
    fontWeight: 'bold',
  },
  viewInfo: {
    height: 60,
    marginBottom: 16,
    justifyContent: 'center',
  },
  keyboardAwareContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputInformation: {
    height: 36,
    borderRadius: 5,
    marginHorizontal: 16,

    textAlign: 'center',
  },
  inputInformationAlert: {
    height: 35,
    borderRadius: 5,
    marginHorizontal: 16,

    textAlign: 'center',

    borderColor: '#',
    borderWidth: 1,
  },
  containerButton: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default ExampleModal;
