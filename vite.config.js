import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Add middleware to handle client-side routing
    middlewares: [
      (req, res, next) => {
        // Redirect all routes to index.html
        if (req.url !== '/' && !req.url.includes('.')) {
          req.url = '/';
        }
        next();
      }
    ]
  },
  // Base URL configuration
  base: '/',
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  }
});