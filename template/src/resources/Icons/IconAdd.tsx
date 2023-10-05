import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconAdd = ({
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
        d='M12.5 6v12M18.5 12h-12'
        stroke={fill || '#fff'}
        strokeWidth={2.5}
        strokeLinecap='round'
      />
    </Svg>
  );
};

export default withIcon(IconAdd);
