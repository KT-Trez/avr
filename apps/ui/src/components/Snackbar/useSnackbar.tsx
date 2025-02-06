import { useContext } from 'react';
import { SnackbarContext } from './SnackbarContext.tsx';
import type { SnackbarContextProps } from './types.ts';

export const useSnackbar = () => {
  const context = useContext<SnackbarContextProps | null>(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
};
