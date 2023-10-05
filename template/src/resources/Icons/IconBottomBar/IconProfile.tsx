import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function IconProfile(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M12.973 13.2v-1.6c.36-.178 1.39-1.404 1.498-2.362.283-.021.728-.281.86-1.308.07-.55-.21-.86-.38-.958 0 0 .422-.802.422-1.771 0-1.943-.762-3.6-2.4-3.6 0 0-.568-1.2-2.4-1.2-3.393 0-4.8 2.177-4.8 4.8 0 .883.423 1.771.423 1.771-.17.098-.45.408-.38.958.132 1.027.577 1.287.86 1.308.108.958 1.137 2.184 1.497 2.362v1.6c-.8 2.4-7.2.8-7.2 6.4h19.2c0-5.6-6.4-4-7.2-6.4z'
        fill='#777C7E'
      />
    </Svg>
  );
}

export default IconProfile;
