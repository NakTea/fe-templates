// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const StepCategorization = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    width={width || size}
    height={height || size}
    {...rest}>
    <G clipPath="url(#clip0_2793_3748)">
      <Path
        fill={getIconColor(color, 0, '#E3E3E3')}
        d="M14.242 6.586 14.6 5.17h-3.064l.707-2.828h-1.414l-.707 2.828H7.293L8 2.343H6.586L5.879 5.17H2.7l-.358 1.415H5.52l-.82 3.3H1.758L1.4 11.3h2.942l-.585 2.357h1.415l.584-2.357h2.829L8 13.657h1.414L10 11.3h3.3l.358-1.414h-3.3l.83-3.3zm-5.299 3.3H6.114l.83-3.3h2.829z"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2793_3748">
        <Rect width={16} height={16} fill={getIconColor(color, 1, '#FFFFFF')} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default StepCategorization;
