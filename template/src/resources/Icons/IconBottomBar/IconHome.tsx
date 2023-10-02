import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconHome = ({
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
      viewBox='0 0 24 24'>
      <Path
        d='M12.46 1.66a.757.757 0 00-.933 0L.75 10.065l.932 1.178L3 10.216V19.5A1.503 1.503 0 004.5 21h15a1.503 1.503 0 001.5-1.5v-9.277l1.318 1.027.932-1.179-10.79-8.41zM13.5 19.5h-3v-6h3v6zm1.5 0v-6a1.502 1.502 0 00-1.5-1.5h-3A1.502 1.502 0 009 13.5v6H4.5V9.046L12 3.204l7.5 5.85V19.5H15z'
        fill='#fff'
      />
    </Svg>
  );
};

export default withIcon(IconHome);
