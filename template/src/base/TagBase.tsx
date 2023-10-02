import React, { ComponentProps, memo, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { RadioButton as DefaultRadioButton, Text } from 'react-native-paper';

import { H3, Xsmall } from './Typography';

type SelectorProps = {
  value: string;
  label: string;
  BgColor: string;
  color: string;
  transparent: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (value: string) => void;
} & Omit<
  ComponentProps<typeof DefaultRadioButton.Android>,
  'value' | 'onValueChange'
>;

const TagBase = memo(
  ({ label, style, BgColor, color, transparent }: SelectorProps) => {
    const customStyle = useMemo<StyleProp<ViewStyle>>(
      () => [
        {
          backgroundColor: BgColor,
          paddingVertical: 10,
          paddingHorizontal: 18,
        },
        styles.itemContainer,
        style,
      ],
      [style],
    );

    const customStyleTransparent = useMemo<StyleProp<ViewStyle>>(
      () => [
        {
          borderColor: BgColor,
          borderWidth: 2,
          paddingVertical: 8,
          paddingHorizontal: 16,
        },
        styles.itemContainer,
        style,
      ],
      [style],
    );

    const customTagStyle = useMemo<StyleProp<any>>(
      () => [{ color: color }, styles.tag, style],
      [style],
    );
    return (
      <View style={transparent ? customStyleTransparent : customStyle}>
        {/* <Text style={customTagStyle}>{label}</Text> */}
        <Xsmall style={customTagStyle}>{label}</Xsmall>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',

    borderRadius: 8,
  },
  tag: {
    fontSize: 14,
  },
});
export default TagBase;
