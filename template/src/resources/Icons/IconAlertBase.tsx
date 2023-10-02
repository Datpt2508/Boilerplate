import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconAlertBase = ({
  width,
  height,
  fill,
  style,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill={fill}
      style={style}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M.5 8C.5 3.86 3.86.5 8 .5c4.148 0 7.5 3.36 7.5 7.5 0 4.14-3.352 7.5-7.5 7.5C3.86 15.5.5 12.14.5 8zm6.84-2.843c0-.36.3-.66.66-.66.36 0 .652.3.652.66v3.315c0 .36-.292.653-.652.653a.659.659 0 01-.66-.653V5.157zm.668 6.353c-.368 0-.66-.3-.66-.66 0-.36.292-.652.652-.652.367 0 .66.292.66.652a.66.66 0 01-.652.66z'
      />
    </Svg>
  );
};
export default withIcon(IconAlertBase);
