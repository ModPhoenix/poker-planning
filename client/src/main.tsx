import { ApolloProvider } from "@apollo/client";
import {
  createRouter,
  NotFoundRoute,
  RouterProvider,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { client } from "@/api";
import { ConfirmationDialogProvider, ThemeProvider } from "@/components";
import { AuthProvider } from "@/contexts";
import { NotFoundPage } from "@/pages";
import { Route as rootRoute } from "@/routes/__root.tsx";

import "./index.css";

import { routeTree } from "./routeTree.gen";

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
});

const router = createRouter({ routeTree, notFoundRoute });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Toaster />
    <ThemeProvider defaultTheme="dark">
      <ApolloProvider client={client}>
        <AuthProvider>
          <ConfirmationDialogProvider>
            <RouterProvider router={router} />
          </ConfirmationDialogProvider>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
);
