import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconCheckBox = ({
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
      viewBox='0 0 24 24'
      fill={fill}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.09 9.597a.75.75 0 010 1.06l-4.745 4.746a.75.75 0 01-1.061 0L7.91 13.03a.75.75 0 011.06-1.06l1.844 1.842 4.216-4.215a.75.75 0 011.06 0z'
        fill={fill || '#fff'}
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.243 4.743C5.911 3.076 8.49 2.5 12 2.5s6.089.576 7.756 2.243C21.424 6.411 22 8.99 22 12.5s-.576 6.089-2.244 7.757C18.09 21.924 15.51 22.5 12 22.5s-6.09-.576-7.757-2.243C2.575 18.589 2 16.01 2 12.5s.575-6.089 2.243-7.757zm1.06 1.061C4.082 7.027 3.5 9.074 3.5 12.5c0 3.427.58 5.473 1.804 6.696C6.527 20.419 8.573 21 12 21c3.427 0 5.473-.581 6.696-1.804 1.223-1.223 1.804-3.27 1.804-6.696 0-3.427-.581-5.473-1.804-6.696C17.473 4.581 15.426 4 12 4c-3.427 0-5.473.581-6.696 1.804z'
        fill={fill || '#fff'}
      />
    </Svg>
  );
};
export default withIcon(IconCheckBox);
