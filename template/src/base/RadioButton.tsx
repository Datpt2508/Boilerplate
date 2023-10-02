import React, { ComponentProps, memo, useMemo } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { RadioButton as DefaultRadioButton } from 'react-native-paper';

import { H3 } from './Typography';

// import { Paragraph } from '~/base/Typography';

type SelectorProps = {
  value: string;
  label: string;
  style?: StyleProp<ViewStyle>;
  state: boolean;
  onPress?: (value: string) => void;
} & Omit<
  ComponentProps<typeof DefaultRadioButton.Android>,
  'value' | 'onValueChange'
>;

const RadioButton = memo(
  ({ value, label, style, onPress, state, ...props }: SelectorProps) => {
    const onTouchablePress = () => {
      onPress?.(value);
    };

    const customStyle = useMemo<StyleProp<ViewStyle>>(
      () => [styles.itemContainer, style],
      [style],
    );

    return (
      <Pressable onPress={onTouchablePress} style={customStyle}>
        <DefaultRadioButton.Android
          value={value}
          color='#0057E7'
          uncheckedColor='#9EABB9'
          status={state === true ? 'checked' : 'unchecked'}
          onPress={onTouchablePress}
          {...props}
        />
        <H3 style={styles.tag}>{label}</H3>
      </Pressable>
    );
  },
);
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tag: {
    alignItems: 'center',
    maxWidth: '75%',
    paddingTop: 4,
    paddingLeft: 4,
  },
});
export default RadioButton;
