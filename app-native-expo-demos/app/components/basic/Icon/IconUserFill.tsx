// @transformed-icon
import Svg, { Circle, Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const IconUserFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width || size} height={height || size} {...rest}>
    <Circle cx={12} cy={8} r={4} fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')} />
    <Path
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
      d="M20 19v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6"
    />
  </Svg>
);
export default IconUserFill;
