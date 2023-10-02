import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

function IconEmail() {
  return (
    <Svg width={19} height={18} viewBox='0 0 19 18' fill='none'>
      <G clipPath='url(#clip0_224_42641)'>
        <Path
          d='M9.2 1.5C5.06 1.5 1.7 4.86 1.7 9c0 4.14 3.36 7.5 7.5 7.5h3.75V15H9.2c-3.255 0-6-2.745-6-6s2.745-6 6-6 6 2.745 6 6v1.072c0 .593-.532 1.178-1.125 1.178-.592 0-1.125-.585-1.125-1.178V9c0-2.07-1.68-3.75-3.75-3.75-2.07 0-3.75 1.68-3.75 3.75a3.751 3.751 0 006.405 2.648c.488.667 1.328 1.102 2.22 1.102 1.478 0 2.625-1.2 2.625-2.678V9c0-4.14-3.36-7.5-7.5-7.5zm0 9.75A2.247 2.247 0 016.95 9 2.247 2.247 0 019.2 6.75 2.247 2.247 0 0111.45 9a2.247 2.247 0 01-2.25 2.25z'
          fill='#3D5A80'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_224_42641'>
          <Path fill='#fff' transform='translate(.2)' d='M0 0H18V18H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default IconEmail;
