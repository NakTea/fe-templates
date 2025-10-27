// @transformed-icon
import Svg, { G, Path } from 'react-native-svg';
import { getIconColor, IIconItemProps } from './utils';
const SystemAlertBellFill = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
    width={width || size}
    height={height || size}
    {...rest}>
    <G id="Page-1" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
      <G id="Artboard-Copy" transform="translate(-347 -129)">
        <Path
          id="bell"
          fill={getIconColor(color, 0, 'rgba(255, 255, 255, 0.9)')}
          d="M370.27 136h1.459c6.006 0 10.257 4.952 10.257 10.98v8.176l3.132 5.337a1 1 0 0 1-.863 1.507h-26.503a1 1 0 0 1-.861-1.51l3.124-5.288V146.9c0-6.029 4.25-10.899 10.255-10.899M366 163h10c0 2.208-2.238 4-5 4s-5-1.792-5-4"
        />
      </G>
    </G>
  </Svg>
);
export default SystemAlertBellFill;
