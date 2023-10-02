import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconDropDown = ({
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
        d='M9.057 14.36c-.048-.048-.255-.226-.425-.391-1.069-.971-2.819-3.504-3.353-4.83-.086-.201-.267-.71-.279-.982 0-.26.06-.51.182-.746.17-.296.437-.533.753-.663.22-.083.875-.213.887-.213.717-.13 1.883-.202 3.171-.202 1.228 0 2.346.072 3.075.178.011.012.826.142 1.105.284.51.261.827.77.827 1.315v.047c-.012.355-.33 1.1-.34 1.1-.536 1.255-2.2 3.73-3.306 4.724 0 0-.284.28-.461.402-.256.19-.571.284-.887.284-.353 0-.681-.107-.949-.308z'
        fill='#fff'
      />
    </Svg>
  );
};
export default withIcon(IconDropDown);
