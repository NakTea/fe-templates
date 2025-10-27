// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const SystemMoreLine = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width || size} height={height || size} {...rest}>
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path
      d="M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3m0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18m0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5"
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
    />
  </Svg>
);
export default SystemMoreLine;
