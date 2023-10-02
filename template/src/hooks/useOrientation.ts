import { SetStateAction, useEffect, useState } from 'react';
import { Dimensions, ScaledSize, useWindowDimensions } from 'react-native';

type OrientationProps = {
  ORIENTATION_HEIGH: number;
  ORIENTATION_WIDTH: number;
  isPortrait: boolean;
};

export function useOrientation(): OrientationProps {
  // State to hold the connection status
  const [orientation, setOrientation] = useState(useWindowDimensions());

  useEffect(() => {
    const onChange = (result: { screen: SetStateAction<ScaledSize> }) => {
      setOrientation(result.screen);
    };
    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  });

  const ORIENTATION_HEIGH = Dimensions.get('window').height;
  const ORIENTATION_WIDTH = Dimensions.get('window').width;

  return {
    ...orientation,
    ORIENTATION_HEIGH,
    ORIENTATION_WIDTH,
    isPortrait: ORIENTATION_WIDTH < ORIENTATION_HEIGH,
  };
}
