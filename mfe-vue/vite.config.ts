import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'mfe_vue',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue',
      },
      shared: ['vue', '@mfe/shared'],
    }),
  ],
  server: {
    port: 3002,
  },
  build: {
    target: 'esnext',
  },
})