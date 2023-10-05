import React, { ComponentType } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import useScale from '~/hooks/useScale';

export type InjectedProps = {
  width: number | string;
  height: number | string;
  fill?: string;
  style?: StyleProp<ViewStyle>;
};

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const withIcon =
  (IconComponent: ComponentType<InjectedProps>) =>
  ({ color, width, height, style }: IconProps): JSX.Element => {
    const { vScale, hScale } = useScale();

    const iconFill = color;
    const iconWidth = width || hScale * 16;
    const iconHeight = height || vScale * 16;

    return (
      <IconComponent
        fill={iconFill}
        width={iconWidth}
        height={iconHeight}
        style={style}
      />
    );
  };
