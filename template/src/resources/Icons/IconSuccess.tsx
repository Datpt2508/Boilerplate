import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconSuccess = ({
  width,
  height,
  fill,
  style,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      style={style}
      viewBox='0 0 32 32'
      fill={fill}>
      <Path
        d='M13.5 23.9999L4.5 14.9999L5.914 13.5859L13.5 21.1709L27.086 7.58594L28.5 8.99994L13.5 23.9999Z'
        fill='#0057E7'
      />
      {/* <Defs>
        <LinearGradient
          id='paint0_linear_143_26489'
          x1='16.5'
          y1='7.58594'
          x2='16.5'
          y2='23.9999'
          gradientUnits='userSpaceOnUse'>
          <Stop stop-color='#FF7A00' />
          <Stop offset='1' stop-color='#673A11' />
        </LinearGradient>
      </Defs> */}
    </Svg>
  );
};
export default withIcon(IconSuccess);
