import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconArrowLeft = ({
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
        d='M23.334 14.32c0 .443-.33.81-.757.867l-.118.008h-17.5a.875.875 0 01-.119-1.742l.119-.008h17.5c.483 0 .875.392.875.875z'
        fill='#fff'
      />
      <Path
        d='M12.634 20.728a.875.875 0 01-1.137 1.325l-.098-.085-7.058-7.028a.875.875 0 01-.085-1.142l.085-.098 7.058-7.029a.875.875 0 011.32 1.142l-.085.098-6.435 6.41 6.435 6.407z'
        fill='#fff'
      />
    </Svg>
  );
};
export default withIcon(IconArrowLeft);
