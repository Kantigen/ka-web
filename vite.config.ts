import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [{ find: 'app', replacement: '/app' }],
  },
  envPrefix: 'KA_',
});
