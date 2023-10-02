import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useTopInset = (
  androidFallbackInset = 30,
  iosFallbackInset = 30,
  defaultFallbackInset = 0,
) => {
  const insets = useSafeAreaInsets();

  return (
    Platform.select({
      android: (StatusBar.currentHeight || androidFallbackInset) + 5,
      ios: (insets.top || iosFallbackInset) + 5,
    }) || defaultFallbackInset
  );
};

export const useBottomInset = (
  androidFallbackInset = 0,
  iosFallbackInset = 0,
  defaultFallbackInset = 0,
) => {
  const insets = useSafeAreaInsets();

  return (
    Platform.select({
      android: androidFallbackInset + 5,
      ios: (insets?.bottom || iosFallbackInset) + 5,
    }) || defaultFallbackInset
  );
};

export const useLeftInset = (
  androidFallbackInset = 30,
  iosFallbackInset = 30,
  defaultFallbackInset = 0,
) => {
  const insets = useSafeAreaInsets();

  return (
    Platform.select({
      android: androidFallbackInset + 5,
      ios: (insets?.left || iosFallbackInset) + 5,
    }) || defaultFallbackInset
  );
};

export const useRightInset = (
  androidFallbackInset = 30,
  iosFallbackInset = 30,
  defaultFallbackInset = 0,
) => {
  const insets = useSafeAreaInsets();

  return (
    Platform.select({
      android: androidFallbackInset + 5,
      ios: (insets?.right || iosFallbackInset) + 5,
    }) || defaultFallbackInset
  );
};
