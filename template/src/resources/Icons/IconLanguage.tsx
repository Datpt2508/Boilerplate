import * as React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconLanguage = ({
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
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M15.7158 17.4736H8.49585C8.08185 17.4736 7.74585 17.1376 7.74585 16.7236C7.74585 16.3096 8.08185 15.9736 8.49585 15.9736H15.7158C16.1298 15.9736 16.4658 16.3096 16.4658 16.7236C16.4658 17.1376 16.1298 17.4736 15.7158 17.4736Z'
        fill='white'
      />
      <Path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M15.7158 13.2871H8.49585C8.08185 13.2871 7.74585 12.9511 7.74585 12.5371C7.74585 12.1231 8.08185 11.7871 8.49585 11.7871H15.7158C16.1298 11.7871 16.4658 12.1231 16.4658 12.5371C16.4658 12.9511 16.1298 13.2871 15.7158 13.2871Z'
        fill='white'
      />
      <Path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M11.2506 9.11035H8.49561C8.08161 9.11035 7.74561 8.77435 7.74561 8.36035C7.74561 7.94635 8.08161 7.61035 8.49561 7.61035H11.2506C11.6646 7.61035 12.0006 7.94635 12.0006 8.36035C12.0006 8.77435 11.6646 9.11035 11.2506 9.11035Z'
        fill='white'
      />
      <Mask
        id='mask0_260_4521'
        style='mask-type:luminance'
        maskUnits='userSpaceOnUse'
        x='3'
        y='2'
        width='19'
        height='21'>
        <Path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M3 2.5H21.1647V22.4098H3V2.5Z'
          fill='white'
        />
      </Mask>
      <G mask='url(#mask0_260_4521)'>
        <Path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M15.9088 4L8.21976 4.004C5.89176 4.018 4.49976 5.458 4.49976 7.857V17.053C4.49976 19.468 5.90476 20.91 8.25576 20.91L15.9448 20.907C18.2728 20.893 19.6648 19.451 19.6648 17.053V7.857C19.6648 5.442 18.2608 4 15.9088 4ZM8.25676 22.41C5.11276 22.41 2.99976 20.257 2.99976 17.053V7.857C2.99976 4.624 5.04676 2.523 8.21476 2.504L15.9078 2.5H15.9088C19.0528 2.5 21.1648 4.653 21.1648 7.857V17.053C21.1648 20.285 19.1178 22.387 15.9498 22.407L8.25676 22.41Z'
          fill='white'
        />
      </G>
    </Svg>
  );
};
export default withIcon(IconLanguage);
