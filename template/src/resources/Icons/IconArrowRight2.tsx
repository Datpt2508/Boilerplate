import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconArrowRight2 = ({
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
        d='M7.97 19.53a.75.75 0 01-.073-.976l.073-.084L14.439 12l-6.47-6.47a.75.75 0 01-.072-.976l.073-.084a.75.75 0 01.976-.073l.084.073 7 7a.75.75 0 01.073.976l-.073.084-7 7a.75.75 0 01-1.06 0z'
        fill={fill || '#fff'}
      />
    </Svg>
  );
};
export default withIcon(IconArrowRight2);
