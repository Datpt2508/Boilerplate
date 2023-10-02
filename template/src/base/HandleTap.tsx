import React, { ReactNode, useMemo, useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  GestureHandlerGestureEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

interface DoubleTapProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onSingleTap?: () => void;
  onDoubleTap?: () => void;
}
export const HandleTap: React.FC<DoubleTapProps> = ({
  children,
  style,
  onSingleTap,
  onDoubleTap,
}) => {
  const doubleTapRef = useRef(null);

  const onSingleTapEvent = (event: GestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (onSingleTap) {
        onSingleTap();
      }
    }
  };

  const onDoubleTapEvent = (event: GestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (onDoubleTap) {
        onDoubleTap();
      }
    }
  };

  const customStyle = useMemo<StyleProp<ViewStyle>>(() => [style], [style]);

  return (
    <TapGestureHandler
      onHandlerStateChange={onSingleTapEvent}
      waitFor={doubleTapRef}>
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}>
        <View style={customStyle}>{children}</View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
};
