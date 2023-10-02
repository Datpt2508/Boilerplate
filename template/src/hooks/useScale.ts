import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useOrientation } from '~/hooks/useOrientation';

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export default () => {
  const { ORIENTATION_HEIGH, ORIENTATION_WIDTH } = useOrientation();
  const insets = useSafeAreaInsets();

  const [shortDimension, longDimension] =
    ORIENTATION_WIDTH < ORIENTATION_HEIGH
      ? [ORIENTATION_WIDTH, ORIENTATION_HEIGH]
      : [ORIENTATION_HEIGH, ORIENTATION_WIDTH];

  const leftInset = insets?.left || 0;
  const rightInset = insets?.right || 0;
  const topInset = insets?.top || 0;
  const bottomInset = insets?.bottom || 0;

  const vScale = (longDimension - topInset - bottomInset) / guidelineBaseHeight;
  const hScale = (shortDimension - leftInset - rightInset) / guidelineBaseWidth;

  return {
    vScale,
    hScale,
  };
};
