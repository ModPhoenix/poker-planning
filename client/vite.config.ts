import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const GRAPHQL_ENDPOINT = env.VITE_GRAPHQL_ENDPOINT;

  console.log('GRAPHQL_ENDPOINT', GRAPHQL_ENDPOINT);

  return {
    plugins: [tsconfigPaths(), react()],
    server: {
      proxy: {
        '/api': {
          target: GRAPHQL_ENDPOINT,
          changeOrigin: true,
          ws: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  };
});
