import { useContext } from 'react';
import { FlexUIContext, FlexUIConfig } from './FlexUIContext';

export const useFlexUIConfig = (): FlexUIConfig => {
  const context = useContext(FlexUIContext);
  if (context === undefined) {
    throw new Error('useFlexUIConfig must be used within a FlexUIConfigProvider');
  }
  return context;
};
