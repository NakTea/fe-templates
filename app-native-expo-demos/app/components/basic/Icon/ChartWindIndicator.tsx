// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const ChartWindIndicator = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 116"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
      d="M6.16 107.367a4 4 0 1 1-2-.28V86.999h2zm-1.537 1.693a2.001 2.001 0 1 0 .002 4.002 2.001 2.001 0 0 0-.002-4.002M4.985.72a.3.3 0 0 1 .547 0l4.51 9.922a.2.2 0 0 1-.263.266L6.512 9.47v18.944h-2V9.247l-3.774 1.66a.2.2 0 0 1-.263-.265z"
    />
  </Svg>
);
export default ChartWindIndicator;
