import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js into its own chunk
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // Separate React into its own chunk
          'react-vendor': ['react', 'react-dom'],
          // GSAP separate
          'gsap-vendor': ['gsap']
        }
      }
    },
    
    // Minification - using esbuild (faster and built-in)
    minify: 'esbuild',
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Source maps only in development
    sourcemap: false
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'gsap']
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true
  }
})