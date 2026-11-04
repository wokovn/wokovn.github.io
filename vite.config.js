import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'docs',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom', 'lucide-react']
        }
      }
    }
  }
});

