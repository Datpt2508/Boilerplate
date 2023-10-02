import React, { ComponentProps, memo, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  SafeAreaView as DefaultSafeAreaView,
  Edge,
} from 'react-native-safe-area-context';

import { useTopInset } from '~/hooks/useInset';

type SafeAreaViewProps = ComponentProps<typeof DefaultSafeAreaView>;

const edges: Array<Edge> = ['left', 'right'];

const SafeAreaView = memo(
  ({ children, style, ...props }: SafeAreaViewProps) => {
    const topInset = useTopInset();
    const containerStyle = useMemo<StyleProp<ViewStyle>>(
      () => [
        {
          paddingTop: topInset,
        },
        style,
      ],
      [style, topInset],
    );

    return (
      <DefaultSafeAreaView style={containerStyle} edges={edges} {...props}>
        {children}
      </DefaultSafeAreaView>
    );
  },
);

export default SafeAreaView;
