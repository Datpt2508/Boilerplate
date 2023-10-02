import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconEditImage = ({
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
      viewBox='0 0 28 28'
      fill={fill}>
      <Path
        d='M23.571 6.903A3.403 3.403 0 0020.168 3.5H8.127a3.403 3.403 0 00-3.403 3.403v12.861c0 1.365 1.644 2.055 2.618 1.098l4.22-4.147a.621.621 0 00.02-.022l2.016-1.974.087-.074a.786.786 0 011.011.073l2.178 2.133 1.11-1.11-2.188-2.144-.135-.121a2.356 2.356 0 00-3.163.121l-4.661 4.565h.01l-1.553 1.526V6.903c0-1.011.821-1.832 1.833-1.832h12.041c1.013 0 1.833.82 1.833 1.832v5.217a3.47 3.47 0 011.57-.23V6.902zm-3.66 2.62a2.359 2.359 0 10-4.718 0 2.359 2.359 0 004.718 0zm-3.147 0a.788.788 0 111.576 0 .788.788 0 01-1.576 0zm-1.363 10.282l6.18-6.18a2.394 2.394 0 013.385 3.384l-6.181 6.18a2.81 2.81 0 01-1.306.74l-1.916.48a1.035 1.035 0 01-.157.027c-.618.214-3.12.601-4.007-.092-.601-.469-.482-1.397-.228-1.903.042-.082-.021-.189-.11-.174-.691.108-1.302.471-1.913.836-.82.49-1.644.98-2.67.854-1.024-.128-1.536-.76-1.79-1.314-.103-.227.189-.42.406-.3.492.266 1.159.518 1.708.397.393-.088.947-.48 1.567-.918 1.116-.789 2.447-1.731 3.447-1.328.88.353 1.528 1.204 1.078 2.213-.054.123 0 .276.133.306.443.102.815.07 1.187-.11l.448-1.792c.123-.494.379-.946.739-1.306z'
        fill={fill || '#FAFAFA'}
      />
    </Svg>
  );
};
export default withIcon(IconEditImage);
