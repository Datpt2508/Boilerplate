import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconPrev = ({
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
      viewBox='0 0 41 40'
      fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M27.096 7.052a1.832 1.832 0 00-2.427.159L13.132 18.696a1.821 1.821 0 00-.01 2.596l-.018-.023.005.006.158.141c.052.04.104.077.158.11l11.276 11.28a1.805 1.805 0 002.555-.005l.151-.172a1.801 1.801 0 00-.145-2.383l-10.27-10.28L27.23 9.772a1.82 1.82 0 00.163-2.423l-.137-.157-.16-.14z'
        fill={fill || '#000'}
      />
    </Svg>
  );
};

export default withIcon(IconPrev);
