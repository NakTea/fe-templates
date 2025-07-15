// @transformed-icon
import * as React from 'react';
import { getIconColor, IIconItemProps } from './utils';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const Trash = ({ size = 16, width, height, color, ...rest }: IIconItemProps) => (
  <Svg width={width || size} height={height || size} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <Path
      fill={getIconColor(color, 0, 'rgba(0,0,0,0.9019607843137255)')}
      d="M9.1 6.05q.31 0 .52-.22.22-.21.22-.53 0-.91.66-1.58t1.6-.67q.93 0 1.59.67t.66 1.58q0 .32.22.53.21.22.53.22h5.44q.32 0 .53-.22.22-.21.22-.53 0-.31-.22-.52-.21-.22-.53-.22h-4.77q-.27-1.3-1.3-2.15t-2.4-.85q-1.34 0-2.37.85-1.04.85-1.3 2.15H3.43q-.31 0-.53.22-.21.21-.21.52 0 .32.21.53.22.22.53.22zm4.65 11.83q.31 0 .53-.2.22-.21.24-.52l.24-7.01q.02-.31-.2-.54-.23-.23-.54-.25-.32 0-.53.2-.22.21-.22.52l-.26 7.01q-.03.31.2.54t.54.25m-3.48 0q.31-.02.54-.25t.21-.54l-.29-7.01q0-.31-.22-.52-.21-.2-.55-.2-.31.02-.53.25-.21.23-.19.54l.26 7.01q.03.29.24.5.22.22.53.22m6.94 1.92q-.05.48-.41.8-.36.33-.84.33H8.04q-.5 0-.85-.33-.35-.32-.4-.8L5.81 7.22H4.32l.98 12.7q.1 1.08.88 1.8t1.86.72h7.92q1.08 0 1.85-.72t.89-1.8l.96-12.7h-1.49z"
    />
  </Svg>
);
export default Trash;
