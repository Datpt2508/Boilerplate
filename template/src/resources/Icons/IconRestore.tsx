import * as React from 'react';
import Svg, { G, LinearGradient, Path, Stop } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconRestore = ({
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
      viewBox='0 0 64 66'
      fill={fill}>
      <Path
        d='M432.033 311H450a2 2 0 010 4h-17.24l2.91 16h31.69l.479-2.392a2 2 0 113.922.784l-.8 4A2 2 0 01469 335h-32.604l1.273 7H466a2 2 0 010 4h-30a2 2 0 01-1.968-1.642L426.331 302H418a2 2 0 010-4h10a2 2 0 011.968 1.642zm28.795-8h9.164c5.522 0 10.004 4.483 10.004 10 0 5.526-4.473 10-10.004 10H458a2 2 0 010-4h11.992a5.996 5.996 0 006.004-6c0-3.308-2.691-6-6.004-6h-9.164l1.586 1.586a2 2 0 01-2.828 2.828l-5-5a2 2 0 010-2.828l5-5a2 2 0 012.828 2.828zM438 364a7 7 0 110-14 7 7 0 010 14zm0-4a3 3 0 100-6 3 3 0 000 6zm24 4a7 7 0 110-14 7 7 0 010 14zm0-4a3 3 0 100-6 3 3 0 000 6z'
        transform='translate(-416 -298)'
      />
    </Svg>
  );
};
export default withIcon(IconRestore);
