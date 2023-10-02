import React, { ComponentProps, useMemo } from 'react';
import { Appearance, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Divider as DefaultDividers } from 'react-native-paper';

import { useAppTheme } from '~/resources/theme';

type DividersProps = Omit<ComponentProps<typeof DefaultDividers>, 'mode'>;

const Divider = ({ style, ...props }: DividersProps) => {
  const theme = useAppTheme();
  const colorScheme = Appearance.getColorScheme();
  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.containerDivider,
      {
        backgroundColor: colorScheme === 'dark' ? '#000000' : '#000000',
      },
      style,
    ],
    [style],
  );

  return <DefaultDividers style={customStyle} {...props} />;
};

const styles = StyleSheet.create({
  containerDivider: {
    height: 1,
    width: '100%',
  },
});

export default Divider;
