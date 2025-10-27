// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Circle, Rect, Defs, ClipPath } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const IconInformationSMethod = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    width={width || size}
    height={height || size}
    {...rest}>
    <G stroke={getIconColor(color, 0, '#4375C0')} clipPath="url(#clip0_3813_406)">
      <Circle cx={8} cy={8} r={6.5} />
      <Circle cx={8} cy={5.306} r={0.5} fill={getIconColor(color, 0, '#4375C0')} strokeWidth={0.5} />
      <Rect width={0.75} height={4.25} x={7.625} y={7.375} fill={getIconColor(color, 0, '#4375C0')} strokeWidth={0.75} rx={0.375} />
    </G>
    <Defs>
      <ClipPath id="clip0_3813_406">
        <Rect width={16} height={16} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default IconInformationSMethod;
