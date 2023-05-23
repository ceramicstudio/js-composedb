import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import relay from 'vite-plugin-relay'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), relay],
})
