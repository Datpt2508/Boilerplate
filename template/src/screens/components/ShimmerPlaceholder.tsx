import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ShimmerPlaceholderProps,
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';

const SHIMMER_COLORS = ['#F0F0F0', '#DEDEDE', '#F0F0F0'];
const DefaultShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerPlaceholder = (props: ShimmerPlaceholderProps): JSX.Element => {
  return (
    <DefaultShimmerPlaceholder shimmerColors={SHIMMER_COLORS} {...props} />
  );
};

export default ShimmerPlaceholder;
