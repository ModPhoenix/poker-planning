import { DialogProps } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

import { ButtonProps } from "@/components/ui/button";

interface CustomButtonProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
}

export interface ModalOptions {
  open?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode | null;
  confirmationText?: ReactNode;
  cancellationText?: ReactNode;
  dialogProps?: Omit<DialogProps, "open">;
  titleProps?: React.HTMLAttributes<HTMLDivElement>;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  confirmationButtonProps?: CustomButtonProps;
  cancellationButtonProps?: CustomButtonProps;
  allowClose?: boolean;
  resolve?: () => void;
  reject?: () => void;
}

export interface ModalProviderProps {
  children: ReactNode;
  defaultOptions?: ModalOptions;
}
