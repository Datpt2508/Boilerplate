import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

function IconLocate() {
  return (
    <Svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
      <Rect width={56} height={56} rx={4} fill='#0C79FE' />
      <Path
        d='M28 30.5a6.25 6.25 0 116.25-6.25A6.257 6.257 0 0128 30.5zm0-10a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z'
        fill='#fff'
      />
      <Path
        d='M28 45.5L17.456 33.064a44 44 0 01-.436-.564 13.611 13.611 0 01-2.77-8.25 13.75 13.75 0 0127.5 0 13.605 13.605 0 01-2.769 8.247l-.001.003s-.375.493-.431.559L28 45.5zm-8.984-14.506s.291.385.358.468L28 41.635l8.638-10.188c.054-.069.347-.456.348-.457a11.126 11.126 0 002.264-6.74 11.25 11.25 0 00-22.5 0 11.132 11.132 0 002.266 6.744z'
        fill='#fff'
      />
    </Svg>
  );
}

export default IconLocate;
