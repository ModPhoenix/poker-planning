import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useCreateUserMutation } from 'api';
import { useAuth } from 'contexts';

export function CreateUserDialog(): ReactElement {
  const { user, login } = useAuth();
  const [open, setOpen] = useState<boolean>(Boolean(user));
  const [username, setUsername] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const params = useParams();
  const [createUserMutation, { loading, error }] = useCreateUserMutation({
    variables: {
      username,
      roomId: params.id,
    },
  });

  const isUsernameEmpty = !Boolean(username);
  const isUsernameError = isSubmitted && isUsernameEmpty;

  const handleSubmit = async () => {
    setIsSubmitted(true);

    if (!isUsernameEmpty) {
      try {
        const res = await createUserMutation();
        if (res.data) {
          login?.(res.data.createUser);
          setOpen(false);
        }
      } catch {}
    }
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Enter your Username</DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: 0,
        }}
      >
        <DialogContentText
          sx={{
            marginBottom: 2,
          }}
        >
          To be recognized by others, please enter your username.
        </DialogContentText>
        {error && (
          <Alert
            severity="error"
            sx={{
              marginBottom: 2,
            }}
          >
            {error.message}
          </Alert>
        )}
        <TextField
          id="username"
          label="Your username"
          type="text"
          fullWidth
          onChange={onChangeUsername}
          value={username}
          error={isUsernameError}
          helperText={isUsernameError ? 'Username cannot be empty' : ' '}
        />
      </DialogContent>
      <DialogActions
        sx={{
          paddingLeft: 3,
          paddingRight: 3,
          paddingBottom: 3,
        }}
      >
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="center"
          size="large"
        >
          Done
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
