import React, { useMemo } from 'react';
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useColorScheme } from 'react-native';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import Button from '~/base/Button';
import { H4, Large } from '~/base/Typography';

const screenWith = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface ModalProps {
  modalTitle: string;
  modalText: string;
  modalButton: string;
  style?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
  buttonType: 'primaryBtn' | 'secondBtn';
  handlePress: () => void;
}

const ImageModal = getImage('imageModal');
const ModalBase = ({
  modalTitle,
  modalText,
  modalButton,
  buttonType,
  handlePress,
  style,
  styleLabel: styleLabel,
}: ModalProps) => {
  const theme = useAppTheme();

  const colorScheme = useColorScheme();

  const modalContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: theme.colors.backgroundWrapModal,
      },
      style,
    ],
    [style],
  );

  const modalMain = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor:
          colorScheme === 'light' ? theme.colors.white : '#1F222A',
        borderRadius: 44,
      },
      style,
    ],
    [style],
  );

  const textStyle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color:
          colorScheme === 'light' ? theme.colors.darkColor : theme.colors.white,
        textAlign: 'center',
        marginTop: 16,
      },
      styleLabel,
    ],
    [style],
  );

  const titleStyle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: theme.colors.backgroundTheme,
      },
      styleLabel,
    ],
    [styleLabel],
  );

  const getMode = () => {
    switch (buttonType) {
      case 'primaryBtn':
        return 'strong';
      case 'secondBtn':
        return 'light';
    }
  };

  const getTextColor = () => {
    switch (buttonType) {
      case 'primaryBtn':
        return theme.colors.white;
      case 'secondBtn':
        return colorScheme === 'light'
          ? theme.colors.backgroundTheme
          : theme.colors.white;
    }
  };

  return (
    <View style={[modalContainer, styles.container]}>
      <View style={[modalMain, styles.main]}>
        <Image source={ImageModal} style={styles.image} />
        <View style={styles.wrapText}>
          <H4 bold style={titleStyle}>
            {modalTitle}
          </H4>
          <Large style={textStyle}>{modalText}</Large>
        </View>
        <Button
          onPress={handlePress}
          type='modal'
          mode={getMode()}
          radius='many'
          textColor={getTextColor()}>
          {modalButton}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: screenWith,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    marginLeft: 45,
    marginRight: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
  },
  image: {
    marginTop: 40,
    marginBottom: 32,
  },
  wrapText: {
    paddingLeft: 32,
    paddingRight: 32,
    alignItems: 'center',
    marginBottom: 32,
  },
});

export default ModalBase;
