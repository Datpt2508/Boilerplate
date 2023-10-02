import * as React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconAbout = ({
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
      viewBox='0 0 24 25'>
      <Mask
        id='mask0_260_10921'
        style='mask-type:luminance'
        maskUnits='userSpaceOnUse'
        x='2'
        y='2'
        width='20'
        height='21'>
        <Path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M2 2.5H21.9999V22.5H2V2.5Z'
          fill='white'
        />
      </Mask>
      <G mask='url(#mask0_260_10921)'>
        <Path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M7.664 4C5.135 4 3.5 5.733 3.5 8.416V16.584C3.5 19.267 5.135 21 7.664 21H16.332C18.864 21 20.5 19.267 20.5 16.584V8.416C20.5 5.733 18.864 4 16.334 4H7.664ZM16.332 22.5H7.664C4.276 22.5 2 20.122 2 16.584V8.416C2 4.878 4.276 2.5 7.664 2.5H16.334C19.723 2.5 22 4.878 22 8.416V16.584C22 20.122 19.723 22.5 16.332 22.5Z'
          fill='white'
        />
      </G>
      <Path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M11.9939 17.25C11.5799 17.25 11.2439 16.914 11.2439 16.5V12.5C11.2439 12.086 11.5799 11.75 11.9939 11.75C12.4079 11.75 12.7439 12.086 12.7439 12.5V16.5C12.7439 16.914 12.4079 17.25 11.9939 17.25Z'
        fill='white'
      />
      <Path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M11.9989 9.7041C11.4459 9.7041 10.9939 9.2571 10.9939 8.7041C10.9939 8.1511 11.4369 7.7041 11.9889 7.7041H11.9989C12.5519 7.7041 12.9989 8.1511 12.9989 8.7041C12.9989 9.2571 12.5519 9.7041 11.9989 9.7041Z'
        fill='white'
      />
    </Svg>
  );
};

export default withIcon(IconAbout);
