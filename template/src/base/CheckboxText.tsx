import React, { memo, useMemo } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Checkbox } from 'react-native-paper';

import { Paragraph } from '~/base/Typography';

type SelectorProps = {
  label?: string;
  value?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};
const CheckboxText = memo(({ label, value, style, onPress }: SelectorProps) => {
  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.itemType, style],
    [style],
  );

  return (
    <TouchableOpacity style={customStyle} onPress={onPress}>
      <Checkbox.Android
        status={value ? 'checked' : 'unchecked'}
        color='#1C0056'
        uncheckedColor='#515151'
      />
      <Paragraph style={styles.tag}>{label}</Paragraph>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  itemType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tag: {
    alignItems: 'center',
    paddingTop: 4,
    paddingLeft: 4,
  },
});
export default CheckboxText;
