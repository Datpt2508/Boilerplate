import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconConfirm = ({
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
        d='M9.707 14.293L6.414 11L5 12.414L9.707 17.121L19.414 7.414L18 6L9.707 14.293Z'
        fill='#0057E7'
      />
    </Svg>
  );
};

export default withIcon(IconConfirm);
