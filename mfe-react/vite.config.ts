import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfe_react',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: [],
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
  },
})