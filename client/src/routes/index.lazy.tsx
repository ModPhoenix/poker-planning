import { createLazyFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/pages";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
