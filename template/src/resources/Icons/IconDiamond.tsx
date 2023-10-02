import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconDiamond = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 14 14'
      fill={fill}
      style={style}>
      <Path
        d='M2.54 2.593l1.653 2.18 2.136-2.18H2.54zm5.175 0l2.108 2.151 1.605-2.151H7.715zm-.693.023L4.705 4.98h4.633L7.022 2.616zm4.865.216L10.284 4.98h3.238l-1.635-2.148zm-9.791.02L.516 4.98h3.193L2.096 2.852zm-1.6 2.639l5.699 6.245-2.276-6.245H.496zm3.967 0l2.559 7.023 2.56-7.023h-5.12zm5.662 0l-2.276 6.245 5.699-6.245h-3.423z'
        fill={fill || '#fff'}
      />
    </Svg>
  );
};

export default withIcon(IconDiamond);
