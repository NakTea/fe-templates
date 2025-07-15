import { SvgUri } from 'react-native-svg';

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
export { default as AlarmFill1 } from './AlarmFill1';
export { default as Calendar } from './Calendar';
export { default as CalendarBadgeClock } from './CalendarBadgeClock';
export { default as Dashboard } from './Dashboard';
export { default as Extroversion } from './Extroversion';
export { default as IconWarningJingao } from './IconWarningJingao';
export { default as IconWarningWeixian } from './IconWarningWeixian';
export { default as IconWarningZhuyi } from './IconWarningZhuyi';
export { default as Logo } from './Logo';
export { default as Neuroticism } from './Neuroticism';
export { default as Rain } from './Rain';
export { default as Trash } from './Trash';
export { default as Union } from './Union';
// 导出所有图标组件完毕
