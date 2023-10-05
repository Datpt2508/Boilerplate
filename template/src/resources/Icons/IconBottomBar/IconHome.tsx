import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function IconHome(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.908 15.885H8.093a.75.75 0 010-1.5h5.815a.75.75 0 010 1.5zM18.25 5.158c-.363-.32-.776-.682-1.268-1.137-.223-.18-.467-.386-.726-.604C14.795 2.186 12.795.5 10.972.5 9.17.5 7.3 2.092 5.796 3.371c-.278.236-.538.458-.803.673-.466.432-.879.795-1.243 1.116C1.363 7.261.914 7.812.914 12.713.914 21.5 3.455 21.5 11 21.5c7.544 0 10.086 0 10.086-8.787 0-4.902-.449-5.453-2.837-7.555z'
        fill='#777C7E'
      />
    </Svg>
  );
}

export default IconHome;
