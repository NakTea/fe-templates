// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const MediaDoubanOval = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    id="_\u56FE\u5C42_1"
    data-name="\u56FE\u5C42 1"
    viewBox="0 0 200 200"
    width={width || size}
    height={height || size}
    {...rest}>
    <Circle
      cx={100}
      cy={100}
      r={87.2}
      style={{
        fill: getIconColor(color, 0, '#0ac411'),
        strokeWidth: 0,
      }}
    />
    <Path
      d="M56.7 55.1h86.6v9.8H56.7zm79.1 58.1V75.1H64.2v38.1zM74.6 84.8h50.9v18.6H74.6zm45.7 50.4c3.1-4.8 6.1-10.3 8.8-16.6l-10.4-3.8c-2.7 7.4-5.9 14.2-9.4 20.4H91.2q-4.5-11.85-10.2-20.4l-9.6 3.8c3.9 5.9 7.1 11.4 9.6 16.6H54.3v9.7h91.5v-9.7z"
      style={{
        strokeWidth: 0,
        fill: getIconColor(color, 1, '#FFFFFF'),
      }}
    />
  </Svg>
);
export default MediaDoubanOval;
