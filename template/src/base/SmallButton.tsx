import React, { ComponentProps, useMemo } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Button as DefaultButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import IconPlus from '~/resources/Icons/IconButton/IconPlus';

type ButtonType = 'square' | 'circle';

export type ButtonProps = {
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  active?: boolean;
  uppercase?: boolean;
  //   children: ReactNode;
  BgColor?: string;
  isIcon?: boolean;
  borderColor?: string;
  icon?: IconSource;
} & Omit<
  ComponentProps<typeof DefaultButton>,
  'style' | 'contentStyle' | 'labelStyle' | 'disabled' | 'mode' | 'uppercase'
>;

const SmallButton = ({
  type,
  borderColor,
  style,
  onPress,
  BgColor,
  ...props
}: ButtonProps) => {
  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        borderRadius: type === 'circle' ? 30 : 12,
        borderBottomWidth: 4,
        borderBottomColor: borderColor,
        backgroundColor: BgColor,
        width: 54,
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        flexDirection: 'row',
      },
      style,
    ],
    [BgColor, type, borderColor],
  );

  return (
    <TouchableOpacity style={customStyle} onPress={onPress}>
      <IconPlus />
    </TouchableOpacity>
  );
};

export default SmallButton;
