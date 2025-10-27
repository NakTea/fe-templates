// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const SystemWatchFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    id="Layer_1"
    viewBox="0 0 24 24"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      fillRule="evenodd"
      d="M12 4C4.063 4-.012 12-.012 12S3.063 20 12 20c8.093 0 12.011-7.969 12.011-7.969S20.062 4 12 4m.018 13c-2.902 0-5-2.188-5-5 0-2.813 2.098-5 5-5s5 2.187 5 5c0 2.812-2.098 5-5 5m0-8c-1.658.003-3 1.393-3 3s1.342 3 3 3 3-1.395 3-3c0-1.608-1.342-3.003-3-3"
      clipRule="evenodd"
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
    />
  </Svg>
);
export default SystemWatchFill;
