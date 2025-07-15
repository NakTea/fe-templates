// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Ellipse, Circle, Rect, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from 'react-native-svg';
const Rain = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={getIconColor(color, 0, 'none')}
    viewBox="0 0 32 32"
    width={width || size}
    height={height || size}
    {...rest}
  >
    <G clipPath="url(#clip0_1687_3447)">
      <Ellipse
        cx={13.907}
        cy={13.732}
        fill={getIconColor(color, 0, 'url(#paint0_linear_1687_3447)')}
        rx={10.925}
        ry={10.759}
      />
      <Circle cx={22.019} cy={16.711} r={8.111} fill={getIconColor(color, 0, 'url(#paint1_linear_1687_3447)')} />
      <G filter="url(#filter0_f_1687_3447)">
        <Rect
          width={1.75}
          height={4.257}
          x={10.41}
          y={27.143}
          fill={getIconColor(color, 0, 'url(#paint2_linear_1687_3447)')}
          rx={0.875}
          transform="rotate(-150 10.41 27.143)"
        />
      </G>
      <Rect
        width={1.75}
        height={4.257}
        x={11.502}
        y={30.207}
        fill={getIconColor(color, 0, 'url(#paint3_linear_1687_3447)')}
        rx={0.875}
        transform="rotate(-150 11.502 30.207)"
      />
      <Rect
        width={1.75}
        height={4.257}
        x={17.414}
        y={27.143}
        fill={getIconColor(color, 0, 'url(#paint4_linear_1687_3447)')}
        rx={0.875}
        transform="rotate(-150 17.414 27.143)"
      />
      <Rect
        width={1.75}
        height={4.257}
        x={18.504}
        y={30.207}
        fill={getIconColor(color, 0, 'url(#paint5_linear_1687_3447)')}
        rx={0.875}
        transform="rotate(-150 18.504 30.207)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_1687_3447"
        x1={13.907}
        x2={10.491}
        y1={2.973}
        y2={24.508}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EFEFEF" />
        <Stop offset={1} stopColor="#565454" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1687_3447"
        x1={22.019}
        x2={19.406}
        y1={8.601}
        y2={24.822}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EFEFEF" />
        <Stop offset={1} stopColor="#565454" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1687_3447"
        x1={11.285}
        x2={9.802}
        y1={27.143}
        y2={30.93}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EFEFEF" />
        <Stop offset={1} stopColor="#7898C8" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_1687_3447"
        x1={12.377}
        x2={10.894}
        y1={30.207}
        y2={33.994}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EFEFEF" />
        <Stop offset={1} stopColor="#7898C8" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_1687_3447"
        x1={18.289}
        x2={16.806}
        y1={27.143}
        y2={30.93}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EFEFEF" />
        <Stop offset={1} stopColor="#7898C8" />
      </LinearGradient>
      <LinearGradient
        id="paint5_linear_1687_3447"
        x1={19.379}
        x2={17.896}
        y1={30.207}
        y2={33.994}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EFEFEF" />
        <Stop offset={1} stopColor="#7898C8" />
      </LinearGradient>
      <ClipPath id="clip0_1687_3447">
        <Rect width={32} height={32} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Rain;
