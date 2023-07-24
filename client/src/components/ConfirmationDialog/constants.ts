import { ModalOptions } from './types';

export const defaultOptions: ModalOptions = {
  title: 'Are you sure?',
  description: '',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {
    maxWidth: 'xs',
    PaperProps: { elevation: 0 },
    sx: (theme) => ({
      '.MuiDialogTitle-root': {
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      },
      '.MuiDialogContent-root': {
        marginTop: theme.spacing(2),
      },
      '.MuiDialogActions-spacing': {
        padding: theme.spacing(2),
        '> :not(:first-of-type)': {
          marginLeft: theme.spacing(2),
        },
      },
    }),
  },
  confirmationButtonProps: {
    variant: 'contained',
    color: 'secondary',
  },
  cancellationButtonProps: {
    variant: 'outlined',
    color: 'secondary',
  },
  titleProps: {
    variant: 'h3',
  },
  contentProps: {},
  allowClose: true,
};
