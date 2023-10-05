import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconBack = ({
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
      viewBox='0 0 28 28'>
      <Path
        d='M23.3333 14.3201C23.3333 14.763 23.0041 15.1291 22.577 15.1871L22.4583 15.1951L4.95825 15.1951C4.475 15.1951 4.08325 14.8033 4.08325 14.3201C4.08325 13.8771 4.41243 13.511 4.83952 13.4531L4.95825 13.4451L22.4583 13.4451C22.9415 13.4451 23.3333 13.8368 23.3333 14.3201Z'
        fill='#262626'
      />
      <Path
        d='M12.6337 20.7284C12.9762 21.0694 12.9774 21.6234 12.6364 21.9659C12.3264 22.2772 11.8404 22.3065 11.4973 22.053L11.399 21.9685L4.34064 14.9405C4.0284 14.6296 3.99999 14.1418 4.25544 13.7988L4.34059 13.7005L11.3989 6.67132C11.7413 6.33032 12.2954 6.33147 12.6364 6.67388C12.9464 6.98517 12.9736 7.47134 12.7187 7.81336L12.6338 7.91132L6.19842 14.3208L12.6337 20.7284Z'
        fill='#262626'
      />
    </Svg>
  );
};

export default withIcon(IconBack);
