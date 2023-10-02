import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconSuggest = ({
  width,
  height,
  fill,
  style,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 172 181'
      fill={fill}
      style={style}>
      <Path
        d='M160.612 38.717C154.893 60.7977 143.196 84.5177 121.666 94.9543C107.907 101.624 88.9334 98.8257 78.3091 87.7656C68.2753 77.3201 62.5106 62.5274 70.1656 49.2146C74.1556 42.2755 80.6849 37.971 88.7849 40.7147C101.16 44.9065 106.734 62.5531 106.779 74.1997C106.919 110.546 84.539 149.695 52.2187 166.683'
        stroke='#0057E7'
        stroke-width='4'
        stroke-linecap='round'
      />
      <Path
        d='M79.5015 166.28C73.169 167.066 58.6608 168.411 51.2872 167.51'
        stroke='#0057E7'
        stroke-width='4'
        stroke-linecap='round'
      />
      <Path
        d='M51.2871 167.51C53.5742 161.553 58.3736 147.795 59.2747 140.422'
        stroke='#0057E7'
        stroke-width='4'
        stroke-linecap='round'
      />
    </Svg>
  );
};
export default withIcon(IconSuggest);
