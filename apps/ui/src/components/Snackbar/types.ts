import type { AlertProps } from '@mui/material';

export type Snackbar = {
  id: string;
  message: string;
  options: SnackbarOptions;
};

export type SnackbarContextProps = {
  enqueueSnackbar: (message: string, options?: SnackbarOptions) => void;
};

export type SnackbarOptions = {
  variant: AlertProps['severity'];
};
