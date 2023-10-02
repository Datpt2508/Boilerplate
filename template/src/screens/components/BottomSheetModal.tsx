import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '~/resources/theme';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

type BottomSheetModalProps = {
  onDismiss?: (e?: GestureResponderEvent) => void;
  visible: boolean;
  expandedHeights: Array<string | number>;
};

const backdropComponent = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={1} disappearsOnIndex={0} />
);

const EnhancedBottomSheetModal = ({
  visible,
  children,
  expandedHeights,
  onDismiss,
}: PropsWithChildren<BottomSheetModalProps>): JSX.Element => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const theme = useAppTheme();

  const snapPoints = useMemo(() => [1, ...expandedHeights], [expandedHeights]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onChange = useCallback(
    (snapPointIndex: number) => {
      if (snapPointIndex <= 0) {
        onDismiss?.();
      }
    },
    [onDismiss],
  );

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
      bottomSheetModalRef.current?.dismiss();
    }
  });

  const backgroundStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: theme.colors.backgroundModal,
      },
    ],
    [theme],
  );

  const indicatorStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: theme.colors.backgroundIndicator,
      },
    ],
    [theme],
  );

  return (
    <BottomSheetModal
      index={1}
      // bottomInset={!isKeyboardVisible ? 8 : -12}
      handleIndicatorStyle={indicatorStyle}
      ref={bottomSheetModalRef}
      backgroundStyle={backgroundStyle}
      snapPoints={snapPoints}
      backdropComponent={backdropComponent}
      onChange={onChange}>
      {children}
    </BottomSheetModal>
  );
};

export default EnhancedBottomSheetModal;
