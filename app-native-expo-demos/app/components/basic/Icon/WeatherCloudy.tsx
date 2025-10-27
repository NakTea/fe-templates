// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Circle, Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const WeatherCloudy = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    width={width || size}
    height={height || size}
    {...rest}>
    <G clipPath="url(#clip0_1687_3433)">
      <Circle
        cx={23.145}
        cy={14.19}
        r={8.436}
        fill={getIconColor(color, 0, 'url(#paint0_linear_1687_3433)')}
        transform="rotate(150 23.145 14.19)"
      />
      <Circle cx={12.257} cy={18.812} r={9.589} fill={getIconColor(color, 0, 'url(#paint1_linear_1687_3433)')} />
      <Circle cx={21.846} cy={21.295} r={7.105} fill={getIconColor(color, 0, 'url(#paint2_linear_1687_3433)')} />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_1687_3433"
        x1={23.145}
        x2={20.427}
        y1={5.754}
        y2={22.626}
        gradientUnits="userSpaceOnUse" fill={getIconColor(color, 0, 'current')}>
        <Stop stopColor="#FFE733" />
        <Stop offset={1} stopColor="#F5B587" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1687_3433"
        x1={12.257}
        x2={9.168}
        y1={9.223}
        y2={28.4}
        gradientUnits="userSpaceOnUse" fill={getIconColor(color, 0, 'current')}>
        <Stop stopColor="#FFFDEF" />
        <Stop offset={1} stopColor="#BABABA" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1687_3433"
        x1={21.846}
        x2={19.557}
        y1={14.19}
        y2={28.401}
        gradientUnits="userSpaceOnUse" fill={getIconColor(color, 0, 'current')}>
        <Stop stopColor="#FFFDEF" />
        <Stop offset={1} stopColor="#BABABA" />
      </LinearGradient>
      <ClipPath id="clip0_1687_3433">
        <Rect width={32} height={32} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default WeatherCloudy;
