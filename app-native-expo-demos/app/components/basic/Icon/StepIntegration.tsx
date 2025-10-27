// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const StepIntegration = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    width={width || size}
    height={height || size}
    {...rest}>
    <G fill={getIconColor(color, 0, '#E3E3E3')} clipPath="url(#clip0_2793_4258)">
      <Path
        d="M2.407 4.249H1.164v8.078c0 .684.56 1.243 1.243 1.243H12.97v-1.243H2.407z"
        fill={getIconColor(color, 0, '#E3E3E3')}
      />
      <Path
        d="M13.591 3.006h-4.35L8 1.763H4.892c-.684 0-1.237.56-1.237 1.243L3.65 9.842c0 .683.56 1.242 1.243 1.242h8.7c.683 0 1.242-.559 1.242-1.242V4.249c0-.684-.56-1.243-1.243-1.243"
        fill={getIconColor(color, 0, '#E3E3E3')}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2793_4258">
        <Rect width={16} height={16} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default StepIntegration;
