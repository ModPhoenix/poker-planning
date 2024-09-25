import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import {
  ChangeEvent,
  ReactElement,
  useState,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { useEditUserMutation } from "@/api";
import { useAuth } from "@/contexts";

interface EditUserDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// TODO: reuse code between two similar components CreateUserDialog and EditUserDialog
export function EditUserDialog({
  open,
  setOpen,
}: EditUserDialogProps): ReactElement {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [editUserMutation, { loading, error }] = useEditUserMutation();

  const isUsernameEmpty = !Boolean(username);
  const isUsernameError = isSubmitted && isUsernameEmpty;

  const handleSubmit = async () => {
    setIsSubmitted(true);

    if (!isUsernameEmpty && user) {
      try {
        const res = await editUserMutation({
          variables: {
            userId: user.id,
            username,
          },
        });

        if (res.data) {
          login?.({
            id: res.data.editUser.id,
            username: res.data.editUser.username,
          });
          setOpen(false);
        }
      } catch {}
    }
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  const onKeyPressUsername = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
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
          onKeyPress={onKeyPressUsername}
          value={username}
          error={isUsernameError}
          helperText={isUsernameError ? "Username cannot be empty" : " "}
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
