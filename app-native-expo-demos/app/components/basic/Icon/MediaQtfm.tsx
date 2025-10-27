// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const MediaQtfm = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="icon"
    p-id={16710}
    t={1757305295706}
    viewBox="0 0 1024 1024"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      fill={getIconColor(color, 0, '#DD3537')}
      d="M102.4 102.4C20.48 184.32 0 271.36 0 512s20.48 327.68 102.4 409.6S271.36 1024 512 1024c419.84 0 512-92.16 512-512S931.84 0 512 0C271.36 0 184.32 20.48 102.4 102.4m808.96 240.64 15.36 220.16H102.4V368.64c0-107.52 15.36-215.04 35.84-235.52s199.68-25.6 399.36-20.48L896 128z"
      p-id={16711}
    />
    <Path
      fill={getIconColor(color, 0, '#DD3537')}
      d="M409.6 332.8c0 117.76 15.36 138.24 51.2 76.8 46.08-66.56 56.32-66.56 102.4 0 35.84 61.44 51.2 40.96 51.2-76.8s-15.36-138.24-51.2-76.8c-46.08 66.56-56.32 66.56-102.4 0-35.84-61.44-51.2-40.96-51.2 76.8"
      p-id={16712}
    />
  </Svg>
);
export default MediaQtfm;
