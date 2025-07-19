import React from 'react';
import { SvgUri } from 'react-native-svg';

import MediaIqiyi from './MediaIqiyi';

export interface IIconProps {
  name?: string;
  size?: number;
  color?: string;
  url?: string;
  width?: string;
  height?: string;
}

const IconUri = ({ url = '', size = 16, width, height, color, name, ...rest }: IIconProps) => {
  if (url) {
    return <SvgUri width={width || size} height={height || size} uri={url} fill={color} />;
  }
};

export default IconUri;

// 导出所有图标组件开始
export { default as MediaIqiyi } from './MediaIqiyi';
// 导出所有图标组件完毕

export const IconFont = ({ size = 16, width, height, color, name, ...rest }: IIconProps) => {
  switch (name) {
    case 'mediaIqiyi':
      return <MediaIqiyi key="mediaIqiyi" {...rest} />;
  }
  return null;
};
