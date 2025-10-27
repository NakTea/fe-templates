// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const IconWindFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="icon"
    p-id={5851}
    t={1753334252760}
    viewBox="0 0 1024 1024"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
      d="M448 725.333H170.667V640H448a149.333 149.333 0 1 1-139.861 201.813l79.914-29.994A64 64 0 1 0 448 725.333m-234.667-256h576a149.333 149.333 0 1 1-139.861 201.814l79.915-29.995a64 64 0 1 0 59.946-86.485h-576a128 128 0 1 1 0-256H576a64 64 0 1 0-59.947-86.486L436.14 182.23a149.376 149.376 0 0 1 289.194 52.438A149.333 149.333 0 0 1 576 384H213.333a42.667 42.667 0 1 0 0 85.333"
      p-id={5852}
    />
  </Svg>
);
export default IconWindFill;
