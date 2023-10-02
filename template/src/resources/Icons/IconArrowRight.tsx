import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconArrowRight = ({
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
        d='M13.171 6.232a.75.75 0 01.974-1.135l.084.073 6.05 6.024a.75.75 0 01.073.978l-.073.084-6.05 6.025a.75.75 0 01-1.13-.979l.072-.083 5.516-5.494-5.516-5.493z'
        fill={fill || '#6949FF'}
      />
      <Path
        d='M4 11.725a.75.75 0 01.648-.743l.102-.007h15a.75.75 0 01.102 1.493l-.102.007h-15a.75.75 0 01-.75-.75z'
        fill={fill || '#6949FF'}
      />
    </Svg>
  );
};
export default withIcon(IconArrowRight);
