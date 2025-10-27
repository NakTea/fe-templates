// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const StepFiltering = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    width={width || size}
    height={height || size}
    {...rest}>
    <G clipPath="url(#clip0_2793_4265)">
      <Path
        fill={getIconColor(color, 0, '#E3E3E3')}
        d="M2.347 3.376c.073.095 4.186 5.346 4.186 5.346v4.383c0 .401.329.73.737.73h1.466a.74.74 0 0 0 .737-.73v-4.39s4.003-5.12 4.193-5.353c.19-.234.168-.467.168-.467a.733.733 0 0 0-.737-.73H2.901a.724.724 0 0 0-.736.73c0 .146.043.32.182.481"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2793_4265">
        <Rect width={16} height={16} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default StepFiltering;
