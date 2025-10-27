// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const MediaXimalaya = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="icon"
    p-id={13606}
    t={1757305210443}
    viewBox="0 0 1024 1024"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      fill={getIconColor(color, 0, '#FF4713')}
      d="M512 32c265.12 0 480 214.88 480 480 0 265.088-214.88 480-480 480-265.088 0-480-214.912-480-480C32 246.848 246.912 32 512 32"
      p-id={13607}
    />
    <Path
      fill={getIconColor(color, 1, '#FFFFFF')}
      d="M400.64 318.784h-98.784a39.04 39.04 0 0 0-39.264 38.976v332.224c0 21.696 17.6 38.976 39.264 38.976h40.128c11.136-.896 19.936-9.376 19.936-20.8 0-9.664-9.664-18.464-20.512-18.464H321.76a19.616 19.616 0 0 1-19.616-19.616V377.376c0-10.816 8.8-19.328 19.616-19.328h59.2c10.848 0 19.616 8.8 19.616 19.328v312.64c0 19.616-14.336 36.288-33.408 38.944h33.408c21.696 0 38.976-17.28 38.976-38.976V357.76c0-21.376-17.6-38.976-38.976-38.976zm137.088 39.264h137.696c21.664 0 38.976-17.6 38.976-38.976v-.288H517.76c-21.664 0-39.232 17.6-39.232 38.976v392.864h.288c21.664 0 38.944-17.568 38.944-38.944V495.456h125.696v255.168c21.696 0 39.264-17.568 39.264-38.944V494.592c17.856-3.52 31.36-19.36 31.36-38.4v-.288H517.76v-78.816a19.97 19.97 0 0 1 19.936-19.04z"
      p-id={13608}
    />
  </Svg>
);
export default MediaXimalaya;
