import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ModalOptions } from "./types";

type ModalHandler = () => void;

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
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
    confirmationText,
    cancellationText,
    allowClose,
  } = options;

  return (
    <Dialog open={open} onOpenChange={allowClose ? onClose : undefined}>
      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {content ? (
          <div>{content}</div>
        ) : (
          description && <DialogDescription>{description}</DialogDescription>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            disabled={waitingConfirmation || waitingCancellation}
            onClick={async () => {
              setWaitingCancellation(true);
              await onCancel?.();
              setWaitingCancellation(false);
            }}
          >
            {cancellationText}
          </Button>
          <Button
            disabled={waitingConfirmation || waitingCancellation}
            onClick={async () => {
              setWaitingConfirmation(true);
              await onConfirm();
              setWaitingConfirmation(false);
            }}
          >
            {confirmationText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
