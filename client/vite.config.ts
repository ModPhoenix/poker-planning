import path from "path";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const GRAPHQL_ENDPOINT = env.VITE_GRAPHQL_ENDPOINT;

  console.log("GRAPHQL_ENDPOINT", GRAPHQL_ENDPOINT);

  return {
    plugins: [TanStackRouterVite(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: GRAPHQL_ENDPOINT,
          changeOrigin: true,
          ws: true,
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
    },
  };
});
