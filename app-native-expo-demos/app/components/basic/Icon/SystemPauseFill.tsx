// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const SystemPauseFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg width={width || size} height={height || size} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <Path
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
      d="M7.51 3.74q-.53 0-.9.38-.37.37-.37.87v13.99q0 .53.37.89t.9.36q.51 0 .88-.36t.37-.89V4.99q0-.5-.37-.87-.37-.38-.88-.38m9 0q-.53 0-.9.38-.37.37-.37.87v13.99q0 .53.37.89t.9.36q.51 0 .88-.36t.37-.89V4.99q0-.5-.37-.87-.37-.38-.88-.38"
    />
  </Svg>
);
export default SystemPauseFill;
