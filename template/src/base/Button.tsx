import React, { ComponentProps, ReactNode, useMemo } from 'react';
import {
  Appearance,
  Dimensions,
  StyleProp,
  TextStyle,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { Button as DefaultButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

type ButtonType = 'modal' | 'medium' | 'big';
type ButtonRadius = 'many' | 'little';
type ButtonMode = 'login' | 'strong' | 'light' | 'white';

export type ButtonProps = {
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  active?: boolean;
  mode?: ButtonMode;
  uppercase?: boolean;
  children: ReactNode;
  radius?: ButtonRadius;
  BgColor?: string;
  isIcon?: boolean;
  borderColor?: string;
  icon?: IconSource;
} & Omit<
  ComponentProps<typeof DefaultButton>,
  'style' | 'contentStyle' | 'labelStyle' | 'disabled' | 'mode' | 'uppercase'
>;

const SCREEN_WIDTH = Dimensions.get('window').width;

const getBorderRadius = (type?: ButtonRadius) => {
  switch (type) {
    case 'many':
      return 30;
    case 'little':
      return 12;
    default:
      return 12;
  }
};

const getWidth = (type?: ButtonType) => {
  switch (type) {
    case 'medium':
      return SCREEN_WIDTH / 2 - 24;
    case 'big':
      return SCREEN_WIDTH - 48;
    case 'modal':
      return SCREEN_WIDTH / 1.4 - 28;
    default:
      return SCREEN_WIDTH - 48;
  }
};

const Button = ({
  children,
  icon,
  type,
  style,
  textStyle,
  contentStyle,
  radius,
  textColor,
  mode,
  uppercase = false,
  ...props
}: ButtonProps) => {
  const colorScheme = useColorScheme();
  const getBackGroundColor = (mode?: ButtonMode) => {
    switch (mode) {
      case 'login':
        return 'transparent';
      case 'strong':
        return '#0057E7';
      case 'light':
        return '#35383F';
      default:
        return '#0057E7';
    }
  };
  const getBorderColor = (mode?: ButtonMode) => {
    switch (mode) {
      case 'login':
        return '#EEEEEE';
      case 'strong':
        return '#0057E7';
      case 'light':
        return '#262A35';
      default:
        return '#0057E7';
    }
  };
  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        // opacity: getOpacity(disabled),
        borderRadius: getBorderRadius(radius),
        // borderWidth: 1,
        // borderBottomWidth: 4,
        // borderBottomColor: getBorderColor(mode),
        // borderColor: getBorderColor(mode),
        backgroundColor: getBackGroundColor(mode),
        width: getWidth(type),
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        flexDirection: 'row',
      },
      style,
    ],
    [mode, type, radius, colorScheme],
  );
  const customContentStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        width: getWidth(type),
        flex: 1,
      },
      contentStyle,
    ],
    [type],
  );

  const customLabelStyle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        fontSize: 16,
        color: textColor,
      },
      textStyle,
    ],
    [textColor],
  );
  return (
    <DefaultButton
      uppercase={uppercase}
      style={customStyle}
      contentStyle={customContentStyle}
      labelStyle={customLabelStyle}
      icon={icon}
      {...props}>
      {children}
    </DefaultButton>
  );
};

export default Button;
