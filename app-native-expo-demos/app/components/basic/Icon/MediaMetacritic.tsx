// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const MediaMetacritic = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    width={width || size}
    height={height || size} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <Circle cx={44} cy={44} r={41.6} fill={getIconColor(color, 0, '#001B36')} stroke={getIconColor(color, 0, '#FC0')} strokeWidth={4.6} />
    <Path
      fill={getIconColor(color, 1, '#FFFFFF')}
      d="m10.651 50.49 6.453-6.823 3.876 3.579q-1.055-7.833 3.73-12.89 2.541-2.687 5.532-3.627 2.99-.939 6.46-.106-.529-3.941.367-7.112a13.3 13.3 0 0 1 3.188-5.594q2.914-3.081 6.202-4.044 3.288-.96 6.744.255 2.54.915 6.603 4.666l18.15 16.756-7.001 7.402-16.225-14.98q-4.224-3.897-6.176-4.27-2.575-.453-4.594 1.681-1.47 1.554-1.803 3.813-.333 2.258.952 4.579t5.294 6.022l13.632 12.586-7.001 7.403-15.557-14.363q-4.143-3.825-5.72-4.54-1.575-.715-2.95-.429-1.372.287-2.718 1.71-1.62 1.712-1.98 3.946t.844 4.455q1.204 2.22 5.294 5.997l13.792 12.733-7 7.403z"
    />
  </Svg>
);
export default MediaMetacritic;
