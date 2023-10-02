import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconCrown = ({
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
      viewBox='0 0 14 14'
      fill={fill}>
      <Path
        d='M11.484 8.22l.107-.994c.057-.531.095-.881.065-1.102h.01a.875.875 0 10-.662-.303c-.19.117-.439.365-.813.738-.289.288-.433.431-.594.453-.089.013-.18 0-.262-.036-.148-.066-.248-.243-.445-.598L7.846 4.506c-.122-.22-.224-.403-.317-.55a1.167 1.167 0 10-1.059 0c-.092.148-.194.33-.317.55L5.11 6.378c-.199.355-.298.532-.446.598a.486.486 0 01-.262.036c-.16-.022-.305-.165-.594-.453-.374-.373-.622-.62-.812-.738a.875.875 0 10-.663.303h.01c-.03.22.009.572.065 1.102l.108.994c.06.552.108 1.078.169 1.55h8.63c.06-.472.11-.997.169-1.55zm-5.119 4.03h1.27c1.654 0 2.48 0 3.033-.495.24-.216.393-.604.503-1.11H2.828c.11.506.263.895.504 1.11.552.494 1.379.494 3.033.494z'
        fill={fill || '#fff'}
      />
    </Svg>
  );
};
export default withIcon(IconCrown);
