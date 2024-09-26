import { FC, useState } from "react";
import { toast } from "react-hot-toast";

import { useEditUserMutation } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts";

interface EditUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const EditUserDialog: FC<EditUserDialogProps> = ({ open, setOpen }) => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");

  const [editUserMutation, { loading }] = useEditUserMutation({
    onCompleted: (data) => {
      login?.({
        id: data.editUser.id,
        username: data.editUser.username,
      });
      setOpen(false);
      toast.success("Username updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update username: ${error.message}`);
    },
  });

  const handleSubmit = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    if (user) {
      await editUserMutation({
        variables: {
          userId: user.id,
          username: username.trim(),
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
          <DialogDescription>
            Enter your new username below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
