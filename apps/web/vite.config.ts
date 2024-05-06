import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@renderer', replacement: path.resolve(__dirname, 'src') }]
  },
  base: '/ORN-Front/'
})
