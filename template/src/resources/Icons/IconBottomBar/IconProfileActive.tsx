import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconProfileActive = ({
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
      fill={fill}
      viewBox='0 0 32 32'>
      <Path
        d='M16.286 4.857a4.643 4.643 0 110 9.285 4.643 4.643 0 010-9.285zm0-1.857a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm9.285 26h-1.857v-4.643a4.643 4.643 0 00-4.643-4.643H13.5a4.643 4.643 0 00-4.643 4.643V29H7v-4.643a6.5 6.5 0 016.5-6.5h5.571a6.5 6.5 0 016.5 6.5V29z'
        fill={fill || '#0057E7'}
      />
    </Svg>
  );
};

export default withIcon(IconProfileActive);
