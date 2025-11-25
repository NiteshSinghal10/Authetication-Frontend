import { defineConfig } from 'vite'
import angular from '@vitejs/plugin-angular'

export default defineConfig({
  plugins: [angular()],
  server: {
    host: true,           // listen on all network interfaces
    port: 4200,           // your app port
    allowedHosts: 'all'   // allow requests from any hostname
  }
})
