import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconLayer = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      style={style}
      fill={fill}
      viewBox='0 0 26 28'>
      <Path
        d='M12.986 24.119L2.34 15.842 0 17.662l13 10.111 13-10.111-2.354-1.834-10.66 8.29zm.014-3.67l10.631-8.276L26 10.34 13 .228 0 10.338l2.354 1.835L13 20.45zm0-16.567l8.291 6.457L13 16.795 4.709 10.34 13 3.882z'
        fill='#fff'
      />
    </Svg>
  );
};

export default withIcon(IconLayer);
