// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Circle, Path, Ellipse, Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from 'react-native-svg';
const WeatherThunder = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    width={width || size}
    height={height || size}
    {...rest}>
    <G clipPath="url(#clip0_1687_3439)">
      <Circle
        cx={12.546}
        cy={14.011}
        r={10.724}
        fill={getIconColor(color, 0, 'url(#paint0_linear_1687_3439)')}
        transform="rotate(6.92 12.546 14.011)"
      />
      <G filter="url(#filter0_f_1687_3439)">
        <Path
          fill={getIconColor(color, 0, 'url(#paint1_linear_1687_3439)')}
          d="m12.777 25.787 5.6-5.924-2.544 4.576 3.092.375-5.142 5.346 2.018-4.006z"
        />
      </G>
      <Path
        fill={getIconColor(color, 0, 'url(#paint2_linear_1687_3439)')}
        d="m12.777 25.787 5.6-5.924-2.544 4.576 3.092.375-5.142 5.346 2.018-4.006z"
      />
      <G filter="url(#filter1_f_1687_3439)">
        <Ellipse
          cx={17.981}
          cy={21.557}
          fill={getIconColor(color, 0, 'url(#paint3_linear_1687_3439)')}
          rx={3.459}
          ry={3.193}
          transform="rotate(6.92 17.98 21.557)"
        />
      </G>
      <Circle cx={21.5} cy={17.66} r={7.947} fill={getIconColor(color, 0, 'url(#paint4_linear_1687_3439)')} transform="rotate(6.92 21.5 17.66)" />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_1687_3439"
        x1={12.546}
        x2={9.091}
        y1={3.287}
        y2={24.736}
        gradientUnits="userSpaceOnUse" fill={getIconColor(color, 0, 'current')}>
        <Stop stopColor="#585858" />
        <Stop offset={1} stopColor="#BABABA" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1687_3439"
        x1={16.538}
        x2={15.24}
        y1={19.64}
        y2={30.337}
        gradientUnits="userSpaceOnUse" fill={getIconColor(color, 0, 'current')}>
        <Stop stopColor="#FFA100" />
        <Stop offset={1} stopColor="#FFE0AC" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1687_3439"
        x1={16.538}
        x2={15.24}
        y1={19.64}
        y2={30.337}
        gradientUnits="userSpaceOnUse" fill={getIconColor(color, 0, 'current')}>
        <Stop stopColor="#FFA100" />
        <Stop offset={1} stopColor="#FFE0AC" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_1687_3439"
        x1={17.981}
        x2={17.028}
        y1={18.364}
        y2={24.774}
        gradientUnits="userSpaceOnUse" fill={getIconColor(color, 0, 'current')}>
        <Stop stopColor="#7C7C7C" />
        <Stop offset={1} stopColor="#BABABA" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_1687_3439"
        x1={21.5}
        x2={18.94}
        y1={9.714}
        y2={25.607}
        gradientUnits="userSpaceOnUse" fill={getIconColor(color, 0, 'current')}>
        <Stop stopColor="#7C7C7C" />
        <Stop offset={1} stopColor="#BABABA" />
      </LinearGradient>
      <ClipPath id="clip0_1687_3439">
        <Rect width={32} height={32} fill={getIconColor(color, 1, '#FFFFFF')} rx={4} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default WeatherThunder;
