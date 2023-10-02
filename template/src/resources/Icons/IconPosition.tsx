import * as React from 'react';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Use,
} from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconPosition = ({ width, height, style }: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      style={style}
      viewBox='0 0 30 30'
      fill='none'>
      <Circle
        cx={15}
        cy={15}
        r={8.75}
        transform='rotate(-90 15 15)'
        stroke='#fff'
        strokeWidth={1.5}
      />
      <Circle
        cx={15}
        cy={15}
        r={2.5}
        transform='rotate(-90 15 15)'
        fill='#fff'
        stroke='#fff'
        strokeWidth={1.5}
      />
      <Path
        d='M6.25 15.117l-5.39.073m14.022-8.94L14.81.86m14.331 13.95l-5.392.072m-8.558 14.26l-.073-5.392'
        stroke='#fff'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </Svg>
  );
};

export default withIcon(IconPosition);
