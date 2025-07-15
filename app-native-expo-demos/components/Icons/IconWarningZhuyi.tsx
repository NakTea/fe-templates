// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const IconWarningZhuyi = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={getIconColor(color, 0, 'none')}
    viewBox="0 0 16 16"
    width={width || size}
    height={height || size}
    {...rest}
  >
    <G clipPath="url(#clip0_3813_396)">
      <Path
        fill={getIconColor(color, 0, '#FFCE1F')}
        d="M9.873 2.56a2.08 2.08 0 0 0-1.14-.947 2.2 2.2 0 0 0-1.467 0 2.08 2.08 0 0 0-1.14.947l-5.1 8.706q-.42.687-.273 1.454.14.766.726 1.286.588.52 1.4.52h10.227a2.08 2.08 0 0 0 1.407-.513q.593-.506.733-1.28.147-.767-.273-1.467zM7.999 9.873a.65.65 0 0 1-.473-.2.65.65 0 0 1-.2-.473V5.773q0-.267.2-.46A.66.66 0 0 1 8 5.12q.274 0 .474.193t.2.46V9.2q0 .273-.2.473a.65.65 0 0 1-.474.2m0 .88q.354 0 .594.24t.24.593q0 .347-.24.587a.8.8 0 0 1-.594.24.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.587q0-.353.24-.593t.593-.24"
      />
      <Path
        fill={getIconColor(color, 1, '#FFFFFF')}
        d="M7.999 10.753q.354 0 .594.24t.24.593a.8.8 0 0 1-.24.587.8.8 0 0 1-.594.24.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.587q0-.353.24-.593t.593-.24m0-5.633q.273 0 .474.193.2.195.2.46V9.2q0 .273-.2.474a.65.65 0 0 1-.474.2.65.65 0 0 1-.473-.2.65.65 0 0 1-.2-.474V5.773q0-.265.2-.46A.66.66 0 0 1 8 5.12"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3813_396">
        <Rect width={16} height={16} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default IconWarningZhuyi;
