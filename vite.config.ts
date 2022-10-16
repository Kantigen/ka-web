import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: 'app', replacement: '/app' },
      { find: 'test', replacement: '/test' },
    ],
  },
  envPrefix: 'KA_',
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
