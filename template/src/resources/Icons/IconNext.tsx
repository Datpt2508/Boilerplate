import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconNext = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 18 18'
      fill={fill}
      style={style}>
      <Path
        d='M10.125 14.625L9.33187 13.8319L13.5956 9.5625H2.25V8.4375H13.5956L9.33187 4.16812L10.125 3.375L15.75 9L10.125 14.625Z'
        fill='#0057E7'
      />
    </Svg>
  );
};
export default withIcon(IconNext);
