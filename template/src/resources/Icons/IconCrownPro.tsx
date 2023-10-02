import * as React from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

import { InjectedProps, withIcon } from '~/resources/Icons/IconDecorator';

const IconCrownPro = ({ width, height, style }: InjectedProps): JSX.Element => {
  return (
    <Svg width={width} height={height} style={style} viewBox='0 0 83 80'>
      <Circle cx={27.7773} cy={78.4442} r={1.55555} fill='#fff' />
      <Circle cx={54.2223} cy={76.0011} r={0.444442} fill='#fff' />
      <Circle cx={4.44407} cy={59.1109} r={2.22221} fill='#fff' />
      <Circle cx={42.3335} cy={40.3332} r={31.3332} fill='#fff' />
      <Circle cx={73.5553} cy={71.3318} r={1.11111} fill='#fff' />
      <Circle cx={75.7771} cy={49.1111} r={1.11111} fill='#fff' />
      <Circle cx={0.444442} cy={33.3331} r={0.444442} fill='#fff' />
      <Path
        d='M53.529 43.136l.276-2.557c.145-1.365.243-2.265.166-2.832h.027a2.25 2.25 0 10-1.704-.78c-.489.301-1.128.939-2.09 1.897-.742.74-1.112 1.109-1.526 1.166a1.25 1.25 0 01-.675-.095c-.381-.168-.636-.624-1.145-1.537l-2.685-4.814c-.313-.562-.576-1.035-.813-1.413a3 3 0 10-2.724 0c-.237.38-.5.85-.814 1.413l-2.684 4.814c-.51.913-.765 1.37-1.146 1.537a1.25 1.25 0 01-.675.095c-.412-.057-.783-.426-1.525-1.166-.962-.958-1.6-1.596-2.09-1.897a2.25 2.25 0 10-1.704.78h.027c-.076.567.021 1.468.167 2.832l.276 2.557c.153 1.42.279 2.77.435 3.985h22.19c.157-1.214.283-2.564.436-3.985zm-13.163 10.36h3.264c4.254 0 6.381 0 7.8-1.27.62-.555 1.011-1.554 1.295-2.855H31.272c.283 1.301.675 2.302 1.294 2.855 1.42 1.27 3.546 1.27 7.8 1.27z'
        fill='url(#paint0_linear_3394_5853)'
      />
      <Circle cx={79.3032} cy={12.222} r={3.33332} fill='#fff' />
      <Circle cx={47.3327} cy={1.99978} r={1.11111} fill='#fff' />
      <Circle cx={8.88894} cy={4.44442} r={4.44442} fill='#fff' />
      <Defs>
        <LinearGradient
          id='paint0_linear_3394_5853'
          x1={56.2477}
          y1={53.4966}
          x2={22.6344}
          y2={43.2091}
          gradientUnits='userSpaceOnUse'>
          <Stop stopColor='#F89300' />
          <Stop offset={1} stopColor='#FFBB58' />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default withIcon(IconCrownPro);
