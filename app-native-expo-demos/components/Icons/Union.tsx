// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, ForeignObject, Path, Defs, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: div */
import type { SvgProps } from 'react-native-svg';
const Union = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={getIconColor(color, 0, 'none')}
    viewBox="0 0 27 27"
    width={width || size}
    height={height || size}
    {...rest}
  >
    <G clipPath="url(#paint0_angular_1899_1984_clip_path)" data-figma-skip-parse="true">
      <ForeignObject
        width={2516.35}
        height={2516.35}
        x={-1258.18}
        y={-1258.18}
        transform="matrix(-.00816 -.0136 .01383 -.00816 16.14 12.871)"
      ></ForeignObject>
    </G>
    <Path
      fillRule="evenodd"
      d="m16.597 13.072 1.649-9.158L15.03.618l-3.801 2.057 4.48 8.659-.008.008zm-.433 2.26 8.252-4.432.594-4.547-3.992-1.663-4.036 8.872-.012-.002zm6.591 4.707-8.64-3.632 1.9-.48.006.01 9.514-2.404 1.178 4.131zm-10.766-4.55 2.523 8.96 4.34 1.587 2.525-3.488-7.828-5.874.004-.012zm-6.097 5.32 5.494-7.542.05 1.944-.011.003.247 9.73-4.325.218zm6.868-9.392-9.375.445L.86 15.703l2.87 3.215 7.52-6.257.01.006zM8.883 4.342l6.195 6.988-1.922-.385-.001-.011L3.53 9.008l.747-4.229z"
      clipRule="evenodd"
      data-figma-gradient-fill='{"type":"GRADIENT_ANGULAR","stops":[{"color":{"r":0.29803922772407532,"g":0.63137257099151611,"b":0.55294120311737061,"a":1.0},"position":0.0},{"color":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"position":1.0}],"stopsVar":[{"color":{"r":0.29803922772407532,"g":0.63137257099151611,"b":0.55294120311737061,"a":1.0},"position":0.0},{"color":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"position":1.0}],"transform":{"m00":-16.327281951904297,"m01":27.655073165893555,"m02":10.476794242858887,"m10":-27.189468383789062,"m11":-16.317102432250977,"m12":34.624420166015625},"opacity":1.0,"blendMode":"NORMAL","visible":true}'
    />
    <Defs>
      <ClipPath id="paint0_angular_1899_1984_clip_path">
        <Path
          fillRule="evenodd"
          d="m16.597 13.072 1.649-9.158L15.03.618l-3.801 2.057 4.48 8.659-.008.008zm-.433 2.26 8.252-4.432.594-4.547-3.992-1.663-4.036 8.872-.012-.002zm6.591 4.707-8.64-3.632 1.9-.48.006.01 9.514-2.404 1.178 4.131zm-10.766-4.55 2.523 8.96 4.34 1.587 2.525-3.488-7.828-5.874.004-.012zm-6.097 5.32 5.494-7.542.05 1.944-.011.003.247 9.73-4.325.218zm6.868-9.392-9.375.445L.86 15.703l2.87 3.215 7.52-6.257.01.006zM8.883 4.342l6.195 6.988-1.922-.385-.001-.011L3.53 9.008l.747-4.229z"
          clipRule="evenodd"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Union;
