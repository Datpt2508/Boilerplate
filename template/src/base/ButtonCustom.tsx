import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface ButtonCustomProps {
  title: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onPress: () => void;
  width?: number | string;
  height?: number | string;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  title,
  leftIcon,
  rightIcon,
  onPress,
  width = '100%',
  height = 58,
  color = '#0057E7',
  disabled = false,
  style,
}) => {
  const customContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.buttonContainer,
      {
        width: width,
        height: height,
        backgroundColor: disabled ? '#777C7E' : color,
        opacity: disabled ? 0.6 : 1,
      },
      style,
    ],
    [style, disabled],
  );

  return (
    <TouchableOpacity
      style={customContainer}
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}>
      {leftIcon && <View style={styles.marginIcon}>{leftIcon}</View>}
      <Text style={styles.textButton}>{title}</Text>
      {rightIcon && <View>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
  },
  marginIcon: {
    marginRight: 16,
  },
  textButton: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SFProDisplay-Medium',
  },
});

export default ButtonCustom;
