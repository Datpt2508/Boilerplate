import * as React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

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
      viewBox='0 0 28 28'
      fill={fill}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.232 26.25h-.002c-1.308-.002-2.546-.578-3.485-1.624a.873.873 0 01.065-1.235.873.873 0 011.236.066c.604.673 1.38 1.043 2.185 1.043.81 0 1.589-.37 2.194-1.044a.876.876 0 011.301 1.17c-.943 1.047-2.183 1.624-3.494 1.624z'
        fill='#fff'
      />
      <Mask
        id='a'
        style={{
          maskType: 'luminance',
        }}
        maskUnits='userSpaceOnUse'
        x={3}
        y={1}
        width={23}
        height={21}>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.5 1.166h21.58v20.24H3.5V1.165z'
          fill='#fff'
        />
      </Mask>
      <G mask='url(#a)'>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.289 2.916c-4.078 0-6.92 3.194-6.92 6.06 0 2.426-.673 3.547-1.268 4.537-.477.794-.854 1.422-.854 2.786.195 2.2 1.647 3.356 9.042 3.356 7.353 0 8.851-1.207 9.045-3.432-.004-1.288-.38-1.916-.858-2.71-.595-.99-1.268-2.11-1.268-4.536 0-2.867-2.842-6.061-6.92-6.061m0 18.49c-5.455 0-10.385-.386-10.788-5.032-.003-1.923.584-2.9 1.102-3.762.523-.873 1.017-1.695 1.017-3.635 0-3.772 3.484-7.811 8.67-7.811 5.185 0 8.669 4.039 8.669 7.81 0 1.941.493 2.763 1.017 3.636.518.861 1.105 1.839 1.105 3.687-.407 4.721-5.336 5.106-10.792 5.106'
          fill='#fff'
        />
      </G>
    </Svg>
  );
};
export default withIcon(IconAlert);
