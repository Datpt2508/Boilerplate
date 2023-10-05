import React, { ComponentProps, memo, useMemo } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { RadioButton as DefaultRadioButton } from 'react-native-paper';

type SelectorProps = {
  value: string;
  label?: string;
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

    const labelStyle = useMemo<StyleProp<TextStyle>>(
      () => [styles.tag, style],
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
        <Text style={labelStyle}>{label}</Text>
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
