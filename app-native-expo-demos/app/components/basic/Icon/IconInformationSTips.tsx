// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Circle, Rect, Defs, ClipPath } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const IconInformationSTips = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    width={width || size}
    height={height || size}
    {...rest}>
    <G clipPath="url(#clip0_3813_390)">
      <Circle cx={8} cy={8} r={6.5} stroke={getIconColor(color, 0, '#FF7500')} />
      <Circle cx={8} cy={5.306} r={0.75} fill={getIconColor(color, 0, '#FF7500')} />
      <Rect width={1.5} height={5} x={7.25} y={7} fill={getIconColor(color, 0, '#FF7500')} rx={0.75} />
    </G>
    <Defs>
      <ClipPath id="clip0_3813_390">
        <Rect width={16} height={16} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default IconInformationSTips;
