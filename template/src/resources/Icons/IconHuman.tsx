import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconHuman = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 20 21'
      fill={fill}
      style={style}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.412 6.576A4.395 4.395 0 0110 10.986a4.396 4.396 0 01-4.412-4.41A4.395 4.395 0 0110 2.166a4.394 4.394 0 014.412 4.41zM10 18.833c-3.615 0-6.667-.587-6.667-2.854 0-2.268 3.071-2.834 6.667-2.834 3.616 0 6.667.587 6.667 2.854 0 2.268-3.072 2.834-6.667 2.834z'
        fill='#fff'
      />
    </Svg>
  );
};

export default withIcon(IconHuman);
