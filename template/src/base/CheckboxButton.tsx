import React, { memo, useMemo } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Checkbox } from 'react-native-paper';

import { H3 } from '~/base/Typography';

type SelectorProps = {
  label: string;
  value: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};
const CheckboxButton = memo(
  ({ label, value, style, onPress }: SelectorProps) => {
    const customStyle = useMemo<StyleProp<ViewStyle>>(
      () => [
        styles.itemType,
        {
          backgroundColor: value ? '#1C005610' : '#FFFFFF',
          borderColor: value ? '#1C0056' : '#D6D6D6',
        },
        style,
      ],
      [style, value],
    );

    return (
      <Pressable style={customStyle} onPress={onPress}>
        <Checkbox.Android
          status={value ? 'checked' : 'unchecked'}
          color='#0057E7'
          uncheckedColor='#0057E7'
          onPress={onPress}
        />
        <H3 style={styles.tag}>{label}</H3>
      </Pressable>
    );
  },
);
const styles = StyleSheet.create({
  itemType: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 16,
  },
  tag: {
    alignItems: 'center',
    paddingTop: 4,
    flex: 1,
  },
});
export default CheckboxButton;
