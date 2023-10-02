import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconBattery = ({
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
      viewBox='0 0 27 14'>
      <Path
        opacity={0.35}
        d='M.5 3.167C.5 1.97 1.47 1 2.667 1h19.666c1.197 0 2.167.97 2.167 2.167v7.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 01.5 10.833V3.167z'
        stroke='#000'
      />
      <Path opacity={0.4} d='M25.65 5.5v4a2.17 2.17 0 000-4z' fill='#000' />
      <Path
        d='M2.3 4.166c0-.736.597-1.333 1.333-1.333h17.534c.736 0 1.333.597 1.333 1.333V9.83c0 .736-.597 1.333-1.333 1.333H3.633A1.333 1.333 0 012.3 9.83V4.166z'
        fill='#000'
      />
    </Svg>
  );
};

export default withIcon(IconBattery);
