import { LoadingButtonProps } from '@mui/lab';
import {
  DialogActionsProps,
  DialogContentProps,
  DialogTitleProps,
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';
import { ReactNode } from 'react';

interface ButtonProps extends LoadingButtonProps {
  onClick?: (
    e: Parameters<NonNullable<LoadingButtonProps['onClick']>>[0],
  ) => Promise<void> | void;
}

export interface ModalOptions {
  open?: boolean;
  title?: ReactNode;
  titleProps?: DialogTitleProps;
  description?: ReactNode;
  content?: ReactNode | null;
  contentProps?: DialogContentProps;
  dialogActionsProps?: DialogActionsProps;
  confirmationText?: ReactNode;
  cancellationText?: ReactNode;
  dialogProps?: Omit<DialogProps, 'open'>;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
  allowClose?: boolean;
  resolve?: () => void;
  reject?: () => void;
}

export interface ModalProviderProps {
  children: ReactNode;
  defaultOptions?: ModalOptions;
}
