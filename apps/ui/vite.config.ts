import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.json'],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});