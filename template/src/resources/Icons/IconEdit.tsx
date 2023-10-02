import * as React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconEdit = ({
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
        d='M24.543 25.596H16.08a.875.875 0 010-1.75h8.462a.875.875 0 010 1.75z'
        fill={fill || '#FAFAFA'}
      />
      <Mask
        id='a'
        style={{
          maskType: 'luminance',
        }}
        maskUnits='userSpaceOnUse'
        x={2}
        y={3}
        width={21}
        height={23}>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.667 3.5h20.044v22.096H2.667V3.5z'
          fill={fill || '#FAFAFA'}
        />
      </Mask>
      <G mask='url(#a)'>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M15.63 5.853L4.644 19.59c-.2.25-.273.572-.2.881l.795 3.366 3.545-.044c.338-.004.649-.154.856-.411C13.394 18.686 20.549 9.733 20.75 9.47c.192-.31.267-.75.167-1.172a1.646 1.646 0 00-.761-1.035 382.759 382.759 0 01-2.11-1.63c-.74-.593-1.818-.49-2.418.219zM4.55 25.596a.876.876 0 01-.852-.673l-.956-4.05a2.766 2.766 0 01.537-2.376l10.99-13.746.013-.015c1.205-1.44 3.384-1.653 4.854-.473l2.01 1.562c.71.422 1.264 1.177 1.474 2.07a3.339 3.339 0 01-.43 2.568c-.036.058-.067.107-11.183 14.013a2.854 2.854 0 01-2.2 1.067l-4.246.053h-.012z'
          fill={fill || '#FAFAFA'}
        />
      </G>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.26 13.631a.878.878 0 01-.533-.18l-6.36-4.887a.876.876 0 01-.161-1.227.876.876 0 011.227-.16l6.362 4.885a.875.875 0 01-.534 1.57z'
        fill={fill || '#FAFAFA'}
      />
    </Svg>
  );
};
export default withIcon(IconEdit);
