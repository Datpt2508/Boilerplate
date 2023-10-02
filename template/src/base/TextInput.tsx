import React, { ComponentProps, forwardRef, memo, useMemo } from 'react';
import { TextInput as NativeTextInput, Platform } from 'react-native';
import { TextInput as DefaultTextInput } from 'react-native-paper';

import useScale from '~/hooks/useScale';

import { useAppTheme } from '~/resources/theme';

type TextInputProps = ComponentProps<typeof DefaultTextInput>;

const TextInput = memo(
  forwardRef<NativeTextInput, TextInputProps>(
    ({ ...props }: TextInputProps, ref) => {
      const theme = useAppTheme();
      const backgroundColor = props.disabled
        ? theme.colors.backgroundDisable
        : theme.colors.background;
      const outlineColor = props.value ? '#959595' : '#D6D6D6';
      const placeholderColor = props.value ? '#515151' : '#51515160';
      const { vScale } = useScale();

      const themeTextInput = useMemo(
        () => ({
          colors: {
            primary: theme.colors?.primary,
            text: theme.colors?.gray,
            placeholder: placeholderColor,
            disabled: theme.colors?.disable,
            background: backgroundColor,
          },
        }),
        [placeholderColor, backgroundColor],
      );

      const textStyle = useMemo(
        () => ({
          fontSize: vScale * 15,
        }),
        [vScale],
      );

      return (
        <DefaultTextInput
          ref={ref}
          outlineColor={outlineColor}
          style={textStyle}
          theme={themeTextInput}
          selectionColor={Platform.select({
            android: '#0A304025',
            ios: '#0A3040',
          })}
          {...props}
        />
      );
    },
  ),
);

export default TextInput;
