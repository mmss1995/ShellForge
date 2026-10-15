import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        mfe_react: process.env.REMOTE_REACT_URL ?? 'http://localhost:3001/assets/remoteEntry.js',
        mfe_vue: process.env.REMOTE_VUE_URL ?? 'http://localhost:3002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'vue', '@mfe/shared'],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})