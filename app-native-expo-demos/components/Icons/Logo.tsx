// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Defs, LinearGradient, Stop, G, Path, Ellipse } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const Logo = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 200 200"
    width={width || size}
    height={height || size}
    {...rest}
  >
    <Defs>
      <LinearGradient id="linearGradient-1" x1="62.102%" x2="108.197%" y1="0%" y2="37.864%">
        <Stop offset="0%" stopColor="#4285EB" />
        <Stop offset="100%" stopColor="#2EC7FF" />
      </LinearGradient>
      <LinearGradient id="linearGradient-2" x1="69.644%" x2="54.043%" y1="0%" y2="108.457%">
        <Stop offset="0%" stopColor="#29CDFF" />
        <Stop offset="37.86%" stopColor="#148EFF" />
        <Stop offset="100%" stopColor="#0A60FF" />
      </LinearGradient>
      <LinearGradient id="linearGradient-3" x1="69.691%" x2="16.723%" y1="-12.974%" y2="117.391%">
        <Stop offset="0%" stopColor="#FA816E" />
        <Stop offset="41.473%" stopColor="#F74A5C" />
        <Stop offset="100%" stopColor="#F51D2C" />
      </LinearGradient>
      <LinearGradient id="linearGradient-4" x1="68.128%" x2="30.44%" y1="-35.691%" y2="114.943%">
        <Stop offset="0%" stopColor="#FA8E7D" />
        <Stop offset="51.264%" stopColor="#F74A5C" />
        <Stop offset="100%" stopColor="#F51D2C" />
      </LinearGradient>
    </Defs>
    <G id="Page-1" fill={getIconColor(color, 0, 'none')} fillRule="evenodd" stroke="none" strokeWidth={1}>
      <G id="logo" transform="translate(-20 -20)">
        <G id="Group-28-Copy-5" transform="translate(20 20)">
          <G id="Group-27-Copy-3">
            <G id="Group-25" fillRule="nonzero">
              <G id={2}>
                <Path
                  id="Shape"
                  fill={getIconColor(color, 0, 'url(#linearGradient-1)')}
                  d="M91.588 4.177 4.18 91.513a11.98 11.98 0 0 0 0 16.974l87.408 87.336a12.005 12.005 0 0 0 16.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228s-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c1.17-1.169 2.944-1.169 4.114 0l27.783 27.76c4.209 4.205 11.032 4.205 15.24 0s4.209-11.022 0-15.227L108.581 4.056c-4.719-4.594-12.312-4.557-16.993.12"
                />
                <Path
                  id="Shape"
                  fill={getIconColor(color, 0, 'url(#linearGradient-2)')}
                  d="M91.588 4.177 4.18 91.513a11.98 11.98 0 0 0 0 16.974l87.408 87.336a12.005 12.005 0 0 0 16.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228s-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c2.912-2.51 7.664-7.596 14.642-8.786q7.778-1.325 17.009 5.837L108.58 4.056c-4.719-4.594-12.312-4.557-16.993.12"
                />
              </G>
              <Path
                id="Shape"
                fill={getIconColor(color, 0, 'url(#linearGradient-3)')}
                d="M153.686 135.855c4.208 4.205 11.031 4.205 15.24 0l27.034-27.012c4.7-4.696 4.7-12.28 0-16.974l-27.27-27.15c-4.218-4.2-11.043-4.195-15.254.013-4.209 4.205-4.209 11.022 0 15.227l18.418 18.403c1.17 1.169 1.17 2.943 0 4.111l-18.168 18.154c-4.209 4.205-4.209 11.023 0 15.228"
              />
            </G>
            <Ellipse
              id="Combined-Shape"
              cx={100.519}
              cy={100.437}
              fill={getIconColor(color, 0, 'url(#linearGradient-4)')}
              rx={23.6}
              ry={23.581}
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);
export default Logo;
