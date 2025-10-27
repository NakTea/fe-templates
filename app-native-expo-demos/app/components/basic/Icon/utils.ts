import type { SvgProps } from 'react-native-svg';

export interface IIconItemProps extends SvgProps {
  size?: number;
  color?: string | string[] | undefined;
}

export const getIconColor = (color: string | string[] | undefined, index: number, defaultColor: string) => {
  const defaultColorTemp = defaultColor === 'current' ? 'rgba(0, 0, 0, 0)' : defaultColor;

  if (!color) {
    return defaultColorTemp;
  } else if (typeof color === 'string' && index === 0) {
    return color;
  } else if (Array.isArray(color)) {
    return color[index] || defaultColorTemp;
  } else {
    return defaultColorTemp;
  }
};
