import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useCreateUserMutation } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts";
import { User } from "@/types";

interface CreateUserDialogProps {
  handleJoinRoomMutation: (user: User) => void;
}

export const CreateUserDialog: FC<CreateUserDialogProps> = ({
  handleJoinRoomMutation,
}) => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState<boolean>(!Boolean(user));

  useEffect(() => {
    setOpen(!Boolean(user));
  }, [setOpen, user]);

  const [createUserMutation, { loading }] = useCreateUserMutation({
    onCompleted: (data) => {
      login?.({
        id: data.createUser.id,
        username: data.createUser.username,
      });
      setOpen(false);
      handleJoinRoomMutation(data.createUser);
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
  });

  const handleSubmit = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    await createUserMutation({
      variables: {
        username: username.trim(),
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create User</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a username to create your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
