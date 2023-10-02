import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconBuy = ({
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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.768 9.36h2.306a.63.63 0 00.625-.638.625.625 0 00-.625-.637h-2.306c-.35 0-.625.28-.625.637a.63.63 0 00.625.638zm5.046-4.421c.508 0 .84.179 1.174.57.333.39.391.952.316 1.462l-.79 5.578c-.15 1.073-1.05 1.863-2.107 1.863H6.322c-1.107 0-2.023-.867-2.115-1.99l-.766-9.27-1.257-.22A.64.64 0 012.4 1.672l1.986.306c.283.051.491.289.516.578l.158 1.905a.513.513 0 00.508.477h11.246zM6.189 15.756c-.7 0-1.266.578-1.266 1.293 0 .705.566 1.284 1.266 1.284.69 0 1.257-.579 1.257-1.284 0-.715-.566-1.293-1.257-1.293zm9.367 0c-.7 0-1.265.578-1.265 1.293 0 .705.566 1.284 1.265 1.284.691 0 1.258-.579 1.258-1.284 0-.715-.567-1.293-1.258-1.293z'
        fill={fill || '#fff'}
      />
    </Svg>
  );
};
export default withIcon(IconBuy);
