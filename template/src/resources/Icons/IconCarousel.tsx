import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconCarousel = ({
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
        d='M2.5 14.166a.807.807 0 01-.594-.24.803.803 0 01-.24-.593V6.666c0-.236.08-.434.24-.594.16-.16.358-.24.594-.24h1.667c.236 0 .434.08.594.24.16.16.24.358.239.594v6.667c0 .236-.08.434-.24.594a.803.803 0 01-.593.239H2.5zm4.167 1.667a.807.807 0 01-.595-.24.803.803 0 01-.239-.594V5c0-.236.08-.434.24-.594.16-.16.358-.24.594-.239h6.666c.236 0 .434.08.595.24.16.16.24.358.239.593v10c0 .236-.08.434-.24.595a.803.803 0 01-.594.239H6.667zm9.166-1.667a.807.807 0 01-.594-.24.803.803 0 01-.239-.593V6.666c0-.236.08-.434.24-.594.16-.16.358-.24.593-.24H17.5c.236 0 .434.08.594.24.16.16.24.358.24.594v6.667c0 .236-.08.434-.24.594a.803.803 0 01-.594.239h-1.667z'
        fill={fill || '#fff'}
      />
    </Svg>
  );
};
export default withIcon(IconCarousel);
