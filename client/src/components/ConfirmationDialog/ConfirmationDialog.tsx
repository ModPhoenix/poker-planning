import { LoadingButton } from '@mui/lab';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

import { ModalOptions } from './types';

type ModalHandler = () => void;

export interface ConfirmationDialogProps
  extends Pick<DialogProps, 'open' | 'onClose'> {
  onCancel?: ModalHandler;
  onConfirm: ModalHandler;
  options: ModalOptions;
}

const ModalDialog = ({
  open,
  options,
  onCancel,
  onConfirm,
  onClose,
}: ConfirmationDialogProps) => {
  const [waitingConfirmation, setWaitingConfirmation] = useState(false);
  const [waitingCancellation, setWaitingCancellation] = useState(false);

  const {
    title,
    description,
    content,
    dialogActionsProps,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    allowClose,
  } = options;

  return (
    <Dialog
      fullWidth
      {...dialogProps}
      open={open}
      onClose={
        allowClose && !waitingConfirmation && !waitingCancellation
          ? onClose
          : undefined
      }
    >
      {title ? <DialogTitle {...titleProps}>{title}</DialogTitle> : null}
      {content ? (
        <DialogContent {...contentProps}>{content}</DialogContent>
      ) : (
        description && (
          <DialogContent {...contentProps}>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )
      )}
      <DialogActions {...dialogActionsProps}>
        <LoadingButton
          loading={waitingCancellation}
          {...cancellationButtonProps}
          disabled={waitingConfirmation || waitingCancellation}
          onClick={async (e) => {
            setWaitingCancellation(true);
            await cancellationButtonProps?.onClick?.(e);
            setWaitingCancellation(false);
            onCancel?.();
          }}
        >
          {cancellationText}
        </LoadingButton>
        <LoadingButton
          color="primary"
          loading={waitingConfirmation}
          {...confirmationButtonProps}
          disabled={waitingConfirmation || waitingCancellation}
          onClick={async (e) => {
            setWaitingConfirmation(true);
            await confirmationButtonProps?.onClick?.(e);
            setWaitingConfirmation(false);
            onConfirm();
          }}
        >
          {confirmationText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
