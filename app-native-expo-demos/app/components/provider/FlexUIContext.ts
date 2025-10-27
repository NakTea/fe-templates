import React from 'react';

export interface FlexUIConfig {
  direction: 'rtl' | 'ltr';
  locale: any; // 根据实际的 locale 对象结构定义更具体的类型
  localeName: string;
  theme: any; // 根据实际的 theme 对象结构定义更具体的类型
  themeName: string;
}

export const FlexUIContext = React.createContext<FlexUIConfig | undefined>(undefined);
