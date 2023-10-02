import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconAlert = ({
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
        d='M18.251 5.78c-.65-.7-2.65.558-3.783 1.357.191.825.283 1.784.283 2.867 0 1.075-.091 2.017-.275 2.842.908.642 2.392 1.583 3.258 1.583.217 0 .4-.058.517-.191.775-.825.775-7.626 0-8.459zM7.343 3.813c-4.559 0-6.175 1.624-6.175 6.191s1.616 6.184 6.175 6.184c4.55 0 6.158-1.617 6.158-6.184 0-4.566-1.608-6.191-6.158-6.191z'
        fill={fill || '#EEE'}
      />
    </Svg>
  );
};
export default withIcon(IconAlert);
