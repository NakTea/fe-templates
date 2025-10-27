// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const IconHumidityFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    id="\u56FE\u5C42_1"
    x={0}
    y={0}
    viewBox="0 0 200 200"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      d="m104.9 17.6-5.3-3.7-5.3 3.7C28.4 67 27.9 120.1 27.9 122.4c0 34.9 32.4 63.4 71.6 63.4s71.6-28.4 71.6-63.4c.1-55.4-63.6-102.9-66.2-104.8m-5.3 154.2c-30.8 0-55.7-21.9-55.7-49.4 0-.5.5-46.1 55.7-89.9 14.3 12.1 55.7 49.4 55.7 89.9 0 27.1-24.9 49.4-55.7 49.4m-21.8-47.9C74.1 108 87.9 91.2 87.9 91.2l-12.7-8.4c-1.1.9-18.1 21.9-13.3 43.8C64.6 138.2 73 148 86.8 155l8.5-12.1c-10.1-5.1-15.9-11.1-17.5-19"
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
    />
  </Svg>
);
export default IconHumidityFill;
