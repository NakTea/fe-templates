// @transformed-icon
import Svg, { Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const SystemLocalFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width || size} height={height || size} {...rest}>
    <Path
      fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
      d="M12 .96q-2.45 0-4.51 1.21-2.07 1.21-3.28 3.28Q3 7.51 3 9.96q0 3.48 2.41 6.8 2.41 3.33 5.15 5.73.62.55 1.44.55t1.44-.55q2.74-2.4 5.15-5.73Q21 13.44 21 9.96q0-2.45-1.21-4.51-1.21-2.07-3.29-3.28T12 .96m0 10.92q-.62 0-1.14-.3t-.82-.82q-.3-.51-.3-1.14 0-.6.3-1.11.3-.52.82-.82t1.14-.3q.6 0 1.12.3.51.3.81.82.3.51.3 1.11 0 .63-.3 1.14-.3.52-.81.82-.52.3-1.12.3"
    />
  </Svg>
);
export default SystemLocalFill;
