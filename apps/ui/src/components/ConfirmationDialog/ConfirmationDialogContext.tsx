import { createContext, type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { ConfirmationDialog, type ConfirmationDialogConfig } from './ConfirmationDialog.tsx';
import type { ConfirmationDialogContextProps } from './types.ts';

export const ConfirmationDialogContext = createContext<ConfirmationDialogContextProps | null>(null);

export const ConfirmationDialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogConfig, setDialogConfig] = useState<ConfirmationDialogConfig | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const isOpen = dialogConfig !== null;

  const handleClose = useCallback(() => {
    setDialogConfig(null);
  }, []);

  const handleOpen = useCallback((config: ConfirmationDialogConfig) => {
    setDialogConfig(config);
  }, []);

  const value = useMemo<ConfirmationDialogContextProps>(
      () => ({
        close: handleClose,
        isOpen,
        open: handleOpen,
        setIsDisabled,
      }),
      [handleClose, handleOpen, isOpen],
  );

  return (
      <ConfirmationDialogContext.Provider value={value}>
        <ConfirmationDialog config={dialogConfig} isDisabled={isDisabled} isOpen={isOpen} onClose={handleClose}/>
        {children}
      </ConfirmationDialogContext.Provider>
  );
};
