import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconHomeActive = ({
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
      fill={fill}
      viewBox='0 0 30 30'>
      <Path
        d='M15.4 22.305l-.34-.668.34.668zm-.8 0l.34-.668-.34.668zM23 11.25c0 2.916-1.513 5.28-3.31 7.062-1.795 1.779-3.807 2.905-4.63 3.325l.68 1.336c.891-.454 3.055-1.663 5.006-3.596 1.95-1.932 3.754-4.657 3.754-8.127H23zm-8-8a8 8 0 018 8h1.5a9.5 9.5 0 00-9.5-9.5v1.5zm-8 8a8 8 0 018-8v-1.5a9.5 9.5 0 00-9.5 9.5H7zm7.94 10.387c-.823-.42-2.835-1.546-4.63-3.325C8.513 16.53 7 14.166 7 11.25H5.5c0 3.47 1.805 6.195 3.754 8.127 1.951 1.933 4.115 3.142 5.005 3.596l.681-1.336zm.12 0c-.04.02-.08.02-.12 0l-.68 1.336a1.624 1.624 0 001.48 0l-.68-1.336zM18 11.25a3 3 0 01-3 3v1.5a4.5 4.5 0 004.5-4.5H18zm-3-3a3 3 0 013 3h1.5a4.5 4.5 0 00-4.5-4.5v1.5zm-3 3a3 3 0 013-3v-1.5a4.5 4.5 0 00-4.5 4.5H12zm3 3a3 3 0 01-3-3h-1.5a4.5 4.5 0 004.5 4.5v-1.5z'
        fill='url(#paint0_linear_43_1010)'
      />
      <Path
        d='M24.743 21.875c.987.57 1.507 1.217 1.507 1.875 0 .658-.52 1.305-1.507 1.875-.988.57-2.408 1.044-4.118 1.373-1.71.329-3.65.502-5.625.502s-3.915-.173-5.625-.502c-1.71-.33-3.13-.803-4.118-1.373-.987-.57-1.507-1.217-1.507-1.875 0-.658.52-1.305 1.507-1.875'
        stroke='url(#paint1_linear_43_1010)'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <Defs>
        <LinearGradient
          id='paint0_linear_43_1010'
          x1={6.25}
          y1={2.5}
          x2={25.9886}
          y2={19.8562}
          gradientUnits='userSpaceOnUse'>
          <Stop stopColor='#FF7A00' />
          <Stop offset={1} stopColor='red' />
        </LinearGradient>
        <LinearGradient
          id='paint1_linear_43_1010'
          x1={3.75}
          y1={20}
          x2={8.25}
          y2={33.5}
          gradientUnits='userSpaceOnUse'>
          <Stop stopColor='#FF7A00' />
          <Stop offset={1} stopColor='red' />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default withIcon(IconHomeActive);
