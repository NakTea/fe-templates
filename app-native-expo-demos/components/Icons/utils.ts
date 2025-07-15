import type { SvgProps } from 'react-native-svg';

export interface IIconItemProps extends SvgProps {
  size?: number;
  color?: string | string[] | undefined;
}

export const getIconColor = (color: string | string[] | undefined, index: number, defaultColor: string) => {
  if (!color) {
    return defaultColor;
  } else if (typeof color === 'string' && index === 0) {
    return color;
  } else if (Array.isArray(color)) {
    return color[index] || defaultColor;
  } else {
    return defaultColor;
  }
};
