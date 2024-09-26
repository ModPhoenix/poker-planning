import { createLazyFileRoute } from "@tanstack/react-router";

import { RoomPage } from "@/pages";

export const Route = createLazyFileRoute("/room/$roomId")({
  component: RoomPage,
});
