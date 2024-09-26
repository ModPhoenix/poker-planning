import { useCallback, useMemo } from "react";

import { copyTextToClipboard } from "@/utils";

import { toast } from "./use-toast";

interface UseCopyRoomUrlReturn {
  copyRoomUrlToClipboard: (roomId: string) => Promise<void>;
}

export function useCopyRoomUrlToClipboard(): UseCopyRoomUrlReturn {
  const copyRoomUrlToClipboard = useCallback(async (roomId: string) => {
    const { origin } = window.location;
    const roomPath = `/room/${roomId}`;

    const isCopySuccess = await copyTextToClipboard(`${origin}${roomPath}`);

    if (isCopySuccess) {
      toast({
        title: "Invite link copied to clipboard",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description:
          "When copying a invite link something went wrong. But don't be discouraged, just copy it yourself from the browser.",
        variant: "destructive",
      });
    }
  }, []);

  return useMemo(() => ({ copyRoomUrlToClipboard }), [copyRoomUrlToClipboard]);
}
