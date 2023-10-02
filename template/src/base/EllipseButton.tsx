import React, { ComponentProps, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

type EllipseButtonProps = {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  size?: number;
} & Omit<ComponentProps<typeof IconButton>, 'disabled' | 'style'>;

const EllipseButton = ({
  disabled,
  style,
  containerStyle,
  size = 24,
  ...props
}: EllipseButtonProps) => {
  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        opacity: disabled ? 0.6 : 1,
      },
      styles.buttonStyle,
      style,
    ],
    [disabled, style],
  );

  const customContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        width: size,
        height: size,
      },
      styles.containerButton,
      containerStyle,
    ],
    [containerStyle, size],
  );

  return (
    <View style={customContainer}>
      <IconButton
        size={size / 1.5}
        disabled={disabled}
        style={customStyle}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: '#D6D6D6',
  },
});

export default EllipseButton;
