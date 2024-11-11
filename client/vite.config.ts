import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/images': 'http://localhost:3000',
      '/socket': 'http://localhost:3000',
    },
  },
  build: {
    outDir: '../server/dist',
  },
  base: '/',
});