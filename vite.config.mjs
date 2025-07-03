import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src/app',
  build: {
    outDir: '../../dist/app',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'ethereum-vendor': ['ethers', 'abi-decoder'],
          'ui-vendor': ['react95', 'styled-components', 'react-modal'],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Increase limit slightly for crypto libraries
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/app', import.meta.url)),
      // Provide browser-compatible polyfills
      'stream': 'stream-browserify',
      'assert': 'assert',
      'events': 'events',
    },
  },
  define: {
    // Define global constants for better tree shaking
    global: 'globalThis',
  },
  optimizeDeps: {
    // Pre-bundle these dependencies
    include: ['react', 'react-dom', 'ethers', 'styled-components'],
  },
  server: {
    port: 3000,
    host: true,
  },
})
