// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const SystemPlayFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg width={width || size} height={height || size} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <Path
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
      d="M6.77 2.35q-.82-.45-1.69-.29-.88.17-1.47.84-.59.68-.59 1.61v14.95q0 .94.59 1.62.59.69 1.47.86.87.16 1.69-.29l12.96-7.49q.81-.46 1.1-1.31t0-1.7-1.1-1.31z"
    />
  </Svg>
);
export default SystemPlayFill;
