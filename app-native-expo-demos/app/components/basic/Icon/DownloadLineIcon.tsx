// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const DownloadLineIcon = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width || size} height={height || size} {...rest}>
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path
      d="M3 19h18v2H3zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2z"
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
    />
  </Svg>
);
export default DownloadLineIcon;
