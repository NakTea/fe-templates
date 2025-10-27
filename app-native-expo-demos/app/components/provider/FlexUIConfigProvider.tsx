import React, { ReactNode } from 'react';
import { FlexUIContext, FlexUIConfig } from './FlexUIContext';

interface FlexUIConfigProviderProps extends FlexUIConfig {
  children: ReactNode;
}

export const FlexUIConfigProvider: React.FC<FlexUIConfigProviderProps> = ({
  children,
  direction,
  locale,
  localeName,
  theme,
  themeName,
}) => {
  const contextValue: FlexUIConfig = {
    direction,
    locale,
    localeName,
    theme,
    themeName,
  };

  return <FlexUIContext.Provider value={contextValue}>{children}</FlexUIContext.Provider>;
};
