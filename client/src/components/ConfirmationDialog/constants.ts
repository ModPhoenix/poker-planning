import { ModalOptions } from "./types";

export const defaultOptions: ModalOptions = {
  title: "Are you sure?",
  description: "",
  content: null,
  confirmationText: "Ok",
  cancellationText: "Cancel",
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
  allowClose: true,
};
