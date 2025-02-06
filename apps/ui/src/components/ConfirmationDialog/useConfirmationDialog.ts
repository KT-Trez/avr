import { useContext } from 'react';
import { ConfirmationDialogContext } from './ConfirmationDialogContext.tsx';
import type { ConfirmationDialogContextProps } from './types.ts';

export const useConfirmationDialog = (): ConfirmationDialogContextProps => {
  const context = useContext<ConfirmationDialogContextProps | null>(ConfirmationDialogContext);

  if (!context) {
    throw new Error('useConfirmationDialog must be used within a ConfirmationDialogProvider');
  }

  return context;
};
