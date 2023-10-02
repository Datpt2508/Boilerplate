import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Modal } from 'react-native-paper';
import RNPermissions, { PERMISSIONS, request } from 'react-native-permissions';

import useModalManager from '~/hooks/useModalManager';

import IconClose from '~/resources/Icons/IconClose';

import Button from '~/base/Button';
import { H4 } from '~/base/Typography';
import { ImageUploadOptions } from '~/types/imageUpload';

interface OptionsPhotoModalContentProps {
  onItemSelected: (item: ImageUploadOptions) => void; // Replace `any` with the appropriate type for the item being passed
  closeModal: () => void;
}

const OptionsPhotoModalContent = ({
  onItemSelected,
  closeModal,
}: OptionsPhotoModalContentProps): JSX.Element => {
  const { t } = useTranslation();

  const openSetting = () => {
    Alert.alert(
      t('Notification'),
      t('You have disabled permission. Please go to settings to enable it.'),
      [
        {
          text: t('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('OK'),
          onPress: () =>
            Linking.openSettings().then(() =>
              console.log('Permission denied, opening settings'),
            ),
        },
      ],
    );
  };

  const imagePickerOptional = {
    multiple: false,
    maxFiles: 1,
    cropping: true,
    width: 512,
    height: 512,
    compressImageQuality: 0.8,
  };

  const handleUploadPhotos = async () => {
    const data = await ImagePicker.openPicker(imagePickerOptional);

    if (data !== null) {
      const image = data as ImageUploadOptions;
      onItemSelected(image);
    }
  };

  const handleCameraPress = useCallback(async () => {
    try {
      const permissionStatus = await RNPermissions.check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      );

      if (permissionStatus !== 'granted') {
        const res = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        );
        if (res === 'granted') {
          const data = await ImagePicker.openCamera({
            multiple: false,
            maxFiles: 1,
            cropping: true,
            width: 512,
            height: 512,
          });

          const image = data as ImageUploadOptions;
          onItemSelected(image);

          // onChange({ images: [image], index });
        } else {
          openSetting();
        }
      } else {
        const data = await ImagePicker.openCamera({
          multiple: false,
          maxFiles: 1,
          cropping: true,
          width: 512,
          height: 512,
        });

        const image = data as ImageUploadOptions;
        console.log('image camera get', image);
        onItemSelected(image);
      }
    } catch (error) {
      return console.error(error);
    }
  }, []);

  const PERMISSION_ANDROID =
    (Platform.Version as number) <= 33
      ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  const handlePhotoPress = useCallback(async () => {
    try {
      const permissionStatus = await RNPermissions.check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSION_ANDROID,
      );

      if (permissionStatus !== 'granted') {
        const res = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        );
        if (res === 'granted') {
          handleUploadPhotos();
        } else {
          openSetting();
        }
      } else {
        handleUploadPhotos();
      }
    } catch (error) {
      return console.error(error);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#1F222A',
        paddingVertical: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        style={{ position: 'absolute', top: 8, right: 8 }}
        onPress={closeModal}>
        <IconClose height={28} width={28} />
      </Pressable>
      <View style={styles.viewH6}>
        <H4 style={styles.h4}>{t('Upload Image!')}</H4>
      </View>
      <View style={styles.viewH6}>
        <Text style={styles.text}>
          {t('Please select the following options:')}
        </Text>
      </View>
      <View style={styles.button}>
        <Button
          type='modal'
          radius='many'
          textColor='white'
          onPress={handleUploadPhotos}>
          {t('Upload Photos')}
        </Button>
      </View>
      <View style={styles.button}>
        <Button
          type='modal'
          radius='many'
          textColor='white'
          onPress={handleCameraPress}>
          {t('Take Photos')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const OptionsPhotoModal = (): JSX.Element | null => {
  const { isOpen, getParams, closeModal } =
    useModalManager('OptionsPhotoModal');
  const visible = isOpen('OptionsPhotoModal');

  const onClose = (): void => {
    closeModal('OptionsPhotoModal');
  };

  const handleImageCallback = (item: any) => {
    getParams('OptionsPhotoModal')?.onImageCallback?.(item);
    closeModal('OptionsPhotoModal');
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}
      theme={{
        colors: {
          backdrop: 'rgba(0, 0, 0, 0.8)',
        },
      }}>
      {visible ? (
        <OptionsPhotoModalContent
          onItemSelected={handleImageCallback}
          closeModal={onClose}
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

  viewH6: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
  },
  h4: {
    fontFamily: 'Urbanist-Bold',
    color: '#0057E7',
  },
  button: {
    marginTop: 24,
    paddingBottom: 12,
    marginHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Urbanist-Regular',
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
  },
});

export default OptionsPhotoModal;
