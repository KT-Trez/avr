import type { ConfirmationDialogConfig } from './ConfirmationDialog.tsx';

export type ConfirmationDialogContextProps = {
  close: () => void;
  isOpen: boolean;
  open: (props: ConfirmationDialogConfig) => void;
  setIsDisabled: (isDisabled: boolean) => void;
};
