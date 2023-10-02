import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconGrid = ({
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
      viewBox='0 0 20 20'
      fill={fill}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.783 1.666H6.6c1.175 0 2.117.958 2.117 2.134v2.841A2.118 2.118 0 016.6 8.774H3.783a2.123 2.123 0 01-2.116-2.133v-2.84c0-1.177.95-2.135 2.116-2.135zm0 9.558H6.6c1.175 0 2.117.95 2.117 2.134V16.2A2.123 2.123 0 016.6 18.332H3.783A2.129 2.129 0 011.667 16.2v-2.84c0-1.184.95-2.135 2.116-2.135zm12.434-9.558H13.4A2.123 2.123 0 0011.283 3.8v2.841c0 1.183.942 2.133 2.117 2.133h2.817c1.166 0 2.116-.95 2.116-2.133v-2.84c0-1.177-.95-2.135-2.116-2.135zM13.4 11.224h2.817c1.166 0 2.116.95 2.116 2.134V16.2c0 1.175-.95 2.133-2.116 2.133H13.4a2.123 2.123 0 01-2.117-2.133v-2.84c0-1.184.942-2.135 2.117-2.135z'
        fill={fill || '#6949FF'}
      />
    </Svg>
  );
};
export default withIcon(IconGrid);
