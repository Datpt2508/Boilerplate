import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconClose = ({
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
        d='M5.67.5h8.67C17.73.5 20 2.88 20 6.42v8.17c0 3.53-2.27 5.91-5.66 5.91H5.67C2.28 20.5 0 18.12 0 14.59V6.42C0 2.88 2.28.5 5.67.5zm7.34 13a.868.868 0 000-1.23l-1.78-1.78 1.78-1.78a.88.88 0 000-1.24.88.88 0 00-1.24 0L10 9.25 8.22 7.47a.88.88 0 00-1.24 0 .88.88 0 000 1.24l1.78 1.78-1.78 1.77a.88.88 0 00.62 1.5c.23 0 .45-.09.62-.26L10 11.73l1.78 1.77c.17.18.39.26.61.26.23 0 .45-.09.62-.26z'
        fill={fill || '#F75555'}
      />
    </Svg>
  );
};

export default withIcon(IconClose);
