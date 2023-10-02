import * as React from 'react';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconLocation = ({
  width,
  height,
  fill,
  style,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 36 52'
      fill={fill}
      style={style}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.166 2.954C14.628-.033 21.342.02 26.753 3.091c5.358 3.134 8.614 8.728 8.584 14.745-.125 5.977-3.616 11.596-7.981 15.94a46.256 46.256 0 01-8.397 6.635c-.315.172-.66.286-1.018.339a2.144 2.144 0 01-.977-.279 45.279 45.279 0 01-12.096-10.7C2.084 26.236.502 21.964.338 17.537.333 11.508 3.703 5.94 9.165 2.954zm3.157 17.078c.92 2.132 3.088 3.523 5.494 3.523a6.036 6.036 0 004.208-1.65 5.543 5.543 0 001.736-4.029c.009-2.307-1.434-4.39-3.655-5.279-2.22-.888-4.78-.406-6.485 1.223-1.704 1.628-2.216 4.08-1.298 6.212z'
        fill='#fff'
      />
      <Ellipse
        opacity={0.4}
        cx={17.8372}
        cy={46.25}
        rx={12.5001}
        ry={2.50001}
        fill='#fff'
      />
    </Svg>
  );
};
export default withIcon(IconLocation);
