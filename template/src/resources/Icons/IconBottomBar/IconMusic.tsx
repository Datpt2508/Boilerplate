import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function IconMusic(props) {
  return (
    <Svg
      width={17}
      height={20}
      viewBox='0 0 17 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M16.187.4a.801.801 0 00-.102.006l-.017.003a.774.774 0 00-.024.004L5.673 2.007a.8.8 0 00-.686.792v10.569c0 .951-.11 1.431-1.997 1.431-2.085 0-2.803 1.217-2.803 2.406 0 .968.565 2.4 2.8 2.4 2.503 0 3.6-1.534 3.6-2.892V6.352l8.8-1.435v6.852c0 .951-.11 1.433-1.997 1.433-2.085-.001-2.803 1.215-2.803 2.404 0 .967.565 2.4 2.8 2.4 2.503 0 3.6-1.685 3.6-3.043V1.2a.8.8 0 00-.8-.8z'
        fill='#777C7E'
      />
    </Svg>
  );
}

export default IconMusic;
