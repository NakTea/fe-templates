// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const StepCalibration = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    width={width || size}
    height={height || size}
    {...rest}>
    <G clipPath="url(#clip0_2793_4249)">
      <Path
        fill={getIconColor(color, 0, '#E3E3E3')}
        d="M7.333 5.333v2h-2v1.334h2v2h1.334v-2h2V7.333h-2v-2zm1.334-3.966v2.02c2.26.326 4 2.26 4 4.613 0 .6-.12 1.167-.32 1.693l1.733 1.02A6.6 6.6 0 0 0 14.667 8a6.67 6.67 0 0 0-6-6.633M8 12.667a4.663 4.663 0 0 1-.667-9.28v-2.02a6.66 6.66 0 0 0-6 6.633c0 3.68 2.98 6.667 6.66 6.667a6.65 6.65 0 0 0 5.374-2.727l-1.734-1.02A4.63 4.63 0 0 1 8 12.667"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2793_4249">
        <Rect width={16} height={16} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default StepCalibration;
