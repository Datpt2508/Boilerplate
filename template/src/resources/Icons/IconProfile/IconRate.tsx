import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconRate = ({
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
      fill={fill}
      viewBox='0 0 34 35'>
      <Rect width='34' height='34' rx='4' fill='#5F7681' />
      <Path
        d='M17 11.6675L18.5525 14.8063L18.8112 15.3688L19.3737 15.4531L22.8387 15.9538L20.375 18.3725L19.9531 18.7831L20.0543 19.3456L20.645 22.7937L17.5456 21.1681L17 20.9375L16.4768 21.2131L13.3775 22.8162L13.94 19.3681L14.0412 18.8056L13.625 18.3725L11.1387 15.9256L14.6037 15.425L15.1662 15.3406L15.425 14.7781L17 11.6675ZM17 9.125L14.4406 14.3113L8.71997 15.1381L12.86 19.1769L11.8812 24.875L17 22.1862L22.1187 24.875L21.14 19.1769L25.28 15.1437L19.5593 14.3113L17 9.125Z'
        fill='white'
      />
    </Svg>
  );
};

export default withIcon(IconRate);
