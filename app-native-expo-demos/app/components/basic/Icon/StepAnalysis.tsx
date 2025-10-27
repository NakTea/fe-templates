// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const StepAnalysis = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      fill={getIconColor(color, 0, '#E3E3E3')}
      d="m12.985 5.863.89-1.959 1.96-.89-1.96-.89-.89-1.959-.89 1.959-1.959.89 1.959.89zm-5.342.356-1.78-3.917-1.781 3.917L.164 8l3.918 1.78 1.78 3.918 1.781-3.917L11.561 8zm5.342 3.918-.89 1.959-1.959.89 1.959.89.89 1.959.89-1.959 1.96-.89-1.96-.89z"
    />
  </Svg>
);
export default StepAnalysis;
