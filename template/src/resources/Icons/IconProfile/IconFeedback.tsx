import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconFeedBack = ({
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
      viewBox='0 0 34 35'>
      <Rect y='0.333984' width='34' height='34' rx='4' fill='#5F7681' />
      <Path
        d='M9.125 22.959H24.875V24.084H9.125V22.959ZM22.2875 13.3965C22.7375 12.9465 22.7375 12.2715 22.2875 11.8215L20.2625 9.79648C19.8125 9.34648 19.1375 9.34648 18.6875 9.79648L10.25 18.234V21.834H13.85L22.2875 13.3965ZM19.475 10.584L21.5 12.609L19.8125 14.2965L17.7875 12.2715L19.475 10.584ZM11.375 20.709V18.684L17 13.059L19.025 15.084L13.4 20.709H11.375Z'
        fill='white'
      />
    </Svg>
  );
};

export default withIcon(IconFeedBack);
