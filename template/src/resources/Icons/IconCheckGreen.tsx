import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconCheckGreen = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 20 21'
      fill={fill}
      style={style}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.67.5h8.67C17.73.5 20 2.88 20 6.42v8.171c0 3.529-2.27 5.909-5.66 5.909H5.67C2.28 20.5 0 18.12 0 14.591V6.42C0 2.88 2.28.5 5.67.5zm3.76 12.99l4.75-4.75c.34-.34.34-.89 0-1.24a.881.881 0 00-1.24 0l-4.13 4.13-1.75-1.75a.881.881 0 00-1.24 0c-.34.34-.34.89 0 1.24l2.38 2.37c.17.17.39.25.61.25.23 0 .45-.08.62-.25z'
        fill={fill || '#12D18E'}
      />
    </Svg>
  );
};

export default withIcon(IconCheckGreen);
