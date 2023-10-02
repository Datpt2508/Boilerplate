import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconCheck = ({
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
      viewBox='0 0 24 24'>
      <Path
        d='M9.707 14.293L6.414 11 5 12.414l4.707 4.707 9.707-9.707L18 6l-8.293 8.293z'
        fill={fill || '#0057E7'}
      />
    </Svg>
  );
};

export default withIcon(IconCheck);
