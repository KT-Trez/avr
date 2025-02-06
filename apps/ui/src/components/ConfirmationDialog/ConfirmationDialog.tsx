import { Button, Dialog, DialogActions, type DialogProps, DialogTitle } from '@mui/material';
import type { ReactNode } from 'react';

export type ConfirmationDialogConfig = {
  confirmButtonText?: string;
  content: ReactNode;
  fullWidth?: DialogProps['fullWidth'];
  maxWidth?: DialogProps['maxWidth'];
  onCancel?: () => void;
  onConfirm?: () => void;
  title: string;
};

type ConfirmationDialogProps = {
  config: ConfirmationDialogConfig | null;
  isDisabled: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const ConfirmationDialog = ({ config, isDisabled, isOpen, onClose }: ConfirmationDialogProps) => {
  return (
      <Dialog fullWidth={config?.fullWidth} maxWidth={config?.maxWidth} open={isOpen}>
        <DialogTitle>{config?.title}</DialogTitle>

        {config?.content}

        <DialogActions>
          <Button color='error' onClick={config?.onCancel ?? onClose}>
            Cancel
          </Button>

          {config?.onConfirm && (
              <Button disabled={isDisabled} onClick={config.onConfirm} variant='contained'>
                {config.confirmButtonText ?? 'Confirm'}
              </Button>
          )}
        </DialogActions>
      </Dialog>
  );
};
