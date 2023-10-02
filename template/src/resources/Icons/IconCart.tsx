import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconCart = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      style={style}
      viewBox='0 0 20 20'
      fill={fill}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.768 9.361h2.306a.63.63 0 00.625-.638.625.625 0 00-.625-.638h-2.306c-.35 0-.625.281-.625.638a.63.63 0 00.625.638zm5.046-4.421c.508 0 .84.178 1.174.57.333.39.391.952.316 1.461l-.79 5.58c-.15 1.072-1.05 1.861-2.107 1.861H6.321c-1.108 0-2.023-.866-2.115-1.989l-.766-9.27-1.257-.221A.64.64 0 012.4 1.674l1.986.305c.283.052.491.29.516.579l.158 1.905a.513.513 0 00.508.477h11.246zM6.189 15.757c-.7 0-1.266.578-1.266 1.292 0 .706.566 1.284 1.266 1.284.69 0 1.257-.578 1.257-1.284 0-.714-.566-1.292-1.257-1.292zm9.367 0c-.7 0-1.265.578-1.265 1.292 0 .706.566 1.284 1.265 1.284.691 0 1.258-.578 1.258-1.284 0-.714-.567-1.292-1.258-1.292z'
        fill={fill || '#fff'}
      />
    </Svg>
  );
};

export default withIcon(IconCart);
