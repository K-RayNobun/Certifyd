import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
    'process.env.CANISTER_ID_CERTIFYD_BACKEND': JSON.stringify('uxrrr-q7777-77774-qaaaq-cai'),
    'process.env.DFX_NETWORK': JSON.stringify('local')
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
})
