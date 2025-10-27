// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SystemPlayCircle = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 800 800"
    width={width || size}
    height={height || size}
    {...rest}>
    <Circle cx={400} cy={400} r={400} fill={getIconColor(color, 0, '#FFF')} fillOpacity={0.2} />
    <Path
      fill={getIconColor(color, 0, '#FFF')}
      d="M351.313 268.304a15.655 15.655 0 0 0-22.079 4.943 15.6 15.6 0 0 0-2.234 8.011v253.844a15.6 15.6 0 0 0 2.234 8.011 15.6 15.6 0 0 0 6.039 5.728 15.67 15.67 0 0 0 16.04-.786l190.714-126.883a15.6 15.6 0 0 0 5.12-5.623 15.586 15.586 0 0 0-5.12-20.362z"
    />
  </Svg>
);
export default SystemPlayCircle;
