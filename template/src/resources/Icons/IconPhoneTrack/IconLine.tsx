import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { InjectedProps, withIcon } from '../IconDecorator';

function IconLine({ width, height, fill }: InjectedProps): JSX.Element {
  return (
    <Svg width={width} height={2} viewBox='0 0 382 2' fill='none'>
      <Path
        stroke='url(#paint0_linear_224_42389)'
        strokeWidth={2}
        strokeDasharray='9 9'
        d='M0 1L382 1'
      />
      <Defs>
        <LinearGradient
          id='paint0_linear_224_42389'
          x1={160.795}
          y1={2.1706}
          x2={160.801}
          y2={3.88838}
          gradientUnits='userSpaceOnUse'>
          <Stop offset={0.35706} stopColor='#120C4C' />
          <Stop offset={1} stopColor='#183F6D' />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default withIcon(IconLine);
