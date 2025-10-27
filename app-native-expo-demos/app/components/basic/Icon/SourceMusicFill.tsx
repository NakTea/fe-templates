// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const SourceMusicFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    id="Layer_1"
    viewBox="0 0 64 64"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      d="M23.727 16.403v24.134a8.3 8.3 0 0 0-4.35-1.233c-4.612 0-8.353 3.74-8.353 8.349a8.354 8.354 0 0 0 8.353 8.354c4.61 0 8.349-3.739 8.35-8.352V25.151l21.25-6.109V33.33a8.3 8.3 0 0 0-4.35-1.233c-4.614 0-8.353 3.739-8.353 8.348a8.354 8.354 0 0 0 8.353 8.354c4.344 0 7.914-3.325 8.31-7.57h.04V7.993z"
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
    />
  </Svg>
);
export default SourceMusicFill;
