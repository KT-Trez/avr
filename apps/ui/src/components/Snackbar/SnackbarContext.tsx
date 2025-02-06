import { Alert, Snackbar as MUISnackbar } from '@mui/material';
import { createContext, type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { defaultSnackbarOptions } from './constants.ts';
import type { Snackbar, SnackbarContextProps, SnackbarOptions } from './types.ts';

export const SnackbarContext = createContext<SnackbarContextProps | null>(null);

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [snackbars, setSnackbars] = useState<Snackbar[]>([]);
  const [currentSnackbar, setCurrentSnackbar] = useState<Snackbar | null>(null);

  const enqueueSnackbar = useCallback((message: string, options?: SnackbarOptions) => {
    const id = (Math.random() * 1_000_000_000).toFixed(0);

    const snackbar: Snackbar = {
      id,
      message,
      options: options ?? defaultSnackbarOptions,
    };

    setSnackbars(prev => [...prev, snackbar]);
  }, []);

  const handleClose = useCallback(() => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== currentSnackbar?.id));
  }, [currentSnackbar]);

  const value = useMemo(() => ({ enqueueSnackbar }), [enqueueSnackbar]);

  useEffect(() => {
    setCurrentSnackbar(snackbars.at(0) || null);
  }, [snackbars]);

  return (
      <SnackbarContext.Provider value={value}>
        <MUISnackbar autoHideDuration={6000} onClose={handleClose} open={!!currentSnackbar}>
          <Alert
              onClose={handleClose}
              severity={currentSnackbar?.options.variant}
              sx={{ width: '100%' }}
              variant='filled'
          >
            {currentSnackbar?.message}
          </Alert>
        </MUISnackbar>

        {children}
      </SnackbarContext.Provider>
  );
};
