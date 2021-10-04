import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ReactElement, useState } from 'react';

export function CreateUserDialog(): ReactElement {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Enter your user name</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            marginBottom: 2,
          }}
        >
          To be recognized by others, please enter your name.
        </DialogContentText>
        <TextField id="username" label="Your username" type="text" fullWidth />
      </DialogContent>
      <DialogActions
        sx={{
          paddingLeft: 3,
          paddingRight: 3,
          paddingBottom: 3,
        }}
      >
        <Button onClick={handleClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}
