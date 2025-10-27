// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const SourceYoutubeFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    width="100%"
    height="100%"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 512 512"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      d="M501.303 132.765c-5.887-22.03-23.235-39.377-45.265-45.265C416.106 76.8 256 76.8 256 76.8s-160.107 0-200.039 10.7c-22.026 5.888-39.377 23.235-45.264 45.265C0 172.693 0 256.003 0 256.003s0 83.308 10.697 123.232c5.887 22.03 23.238 39.382 45.264 45.269C95.893 435.2 256 435.2 256 435.2s160.106 0 200.038-10.696c22.03-5.887 39.378-23.239 45.265-45.269 10.696-39.924 10.696-123.232 10.696-123.232s0-83.31-10.696-123.238M204.797 332.804V179.201l133.019 76.802z"
      style={{
        fillRule: 'nonzero',
      }}
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
    />
  </Svg>
);
export default SourceYoutubeFill;
