// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const MediaKugou = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="icon"
    p-id={9711}
    t={1757305079537}
    viewBox="0 0 1024 1024"
    width={width || size}
    height={height || size}
    {...rest}>
    <Path
      fill={getIconColor(color, 0, '#2F94FD')}
      d="M510.816 990.112C247.456 990.112 32 774.656 32 511.36 32 247.968 247.456 32.512 510.816 32.512c263.328 0 478.784 215.456 478.784 478.816 0 265.728-215.456 478.784-478.784 478.784"
      p-id={9712}
    />
    <Path
      fill={getIconColor(color, 1, '#FFFFFF')}
      d="M343.232 286.272h119.68v155.616L613.76 286.272h167.552s-205.856 191.52-215.456 201.12c-9.568 9.568-14.368 26.336-2.4 45.472 14.4 19.168 179.552 210.688 179.552 210.688l-150.816-2.4L441.376 561.6l-14.368 181.952-124.48 2.368z"
      p-id={9713}
    />
  </Svg>
);
export default MediaKugou;
