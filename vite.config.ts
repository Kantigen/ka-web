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
    port: 3000,
  },
});
