import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

function IconLocated(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <G clipPath='url(#clip0_520_188)'>
        <Path
          d='M15.188-.01A.8.8 0 0014.4.8v.8h-.8a.8.8 0 100 1.6h.8V4A.8.8 0 1016 4v-.8h.8a.8.8 0 100-1.6H16V.8a.798.798 0 00-.813-.81zM9.912 2.633C5.616 3.59 2.4 7.416 2.4 12c0 5.302 4.298 9.6 9.6 9.6 4.584 0 8.411-3.216 9.366-7.513A8.35 8.35 0 0117.2 15.2a8.4 8.4 0 01-8.4-8.4 8.35 8.35 0 011.113-4.166zM20 5.6a.8.8 0 00-.8.8v.8a.8.8 0 01-.8.8h-.8a.8.8 0 000 1.6h.8a.8.8 0 01.8.8v.8a.8.8 0 001.6 0v-.8a.8.8 0 01.8-.8h.8a.8.8 0 000-1.6h-.8a.8.8 0 01-.8-.8v-.8a.8.8 0 00-.8-.8z'
          fill='#777C7E'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_520_188'>
          <Path fill='#fff' d='M0 0H24V24H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default IconLocated;
