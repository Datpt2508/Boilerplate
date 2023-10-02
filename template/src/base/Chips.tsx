/* eslint-disable @typescript-eslint/no-shadow */
import React, { ComponentProps, ReactNode, useMemo } from 'react';
import {
  Appearance,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Chip as DefaultChips, IconButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import { useAppTheme } from '~/resources/theme';

type colorType = 'contained' | 'outlined' | 'elevated';
type SizeType = 'small' | 'medium' | 'large';
type ChipsProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  icon?: IconSource;
  showIconRight?: boolean;
  type: colorType;
  textColor?: string;
  size: SizeType;
} & Omit<ComponentProps<typeof DefaultChips>, 'mode' | 'style' | 'icon'>;
const Chips = ({
  children,
  style,
  size,
  icon,
  type,
  showIconRight,
  textColor,
  ...props
}: ChipsProps) => {
  const theme = useAppTheme();
  const colorScheme = Appearance.getColorScheme();
  const getBackgroundColor = (type: colorType) => {
    if (type === 'contained') {
      return theme.colors.backgroundTheme;
    } else {
      if (colorScheme === 'dark') return theme.colors.darkColor;
      return theme.colors.backgroundWhite;
    }
  };

  const getTextColor = (type: colorType) => {
    if (type === 'contained') {
      return theme.colors.backgroundWhite;
    } else if (type === 'outlined') {
      return theme.colors.backgroundTheme;
    } else {
      if (colorScheme === 'dark') return theme.colors.backgroundWhite;
      else return theme.colors.darkColor;
    }
  };
  const getBorderColor = (type: colorType) => {
    if (type === 'contained' || type === 'outlined') {
      return theme.colors.backgroundTheme;
    } else {
      return theme.colors.gainsboro;
    }
  };
  const getTextSize = (size: SizeType) => {
    if (!size) return 16;
    if (size === 'large') {
      return 18;
    } else {
      return 14;
    }
  };

  const getFontWeight = (size: SizeType) => {
    if (size === 'large') return '700';
    else return '600';
  };
  const getPadding = useMemo(() => {
    if (!size || size === 'small')
      return {
        paddingLeftRight: 0,
        paddingTopBottom: 0,
      };
    if (size === 'large') {
      return {
        paddingLeftRight: 8,
        paddingTopBottom: 4,
      };
    } else {
      return {
        paddingLeftRight: 4,
        paddingTopBottom: 2,
      };
    }
  }, []);
  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: getBackgroundColor(type),
        borderWidth: 2,
        borderRadius: 100,
        borderColor: getBorderColor(type),
        paddingLeft: getPadding.paddingLeftRight,
        paddingRight: getPadding.paddingLeftRight,
        paddingTop: getPadding.paddingTopBottom,
        paddingBottom: getPadding.paddingTopBottom,
        alignSelf: 'center',
      },
      styles.cardChips,
      style,
    ],
    [type, style],
  );

  const styleView = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flexDirection: !showIconRight ? 'row' : 'row-reverse',
        paddingLeft: icon ? 0 : 16,
        paddingRight: 16,
      },
      // style,
    ],
    [showIconRight, icon],
  );

  const customTextStyle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: getTextColor(type),
        fontSize: getTextSize(size),
        fontWeight: getFontWeight(size),
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      styles.textStyle,
    ],
    [icon, textColor, type, size],
  );

  return (
    <View style={customStyle}>
      <View style={styleView}>
        {icon && (
          <IconButton
            icon={icon}
            iconColor={getTextColor(type)}
            size={getTextSize(size)}
            {...props}
          />
        )}
        <Text style={customTextStyle} {...props}>
          {children}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardChips: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chips;
