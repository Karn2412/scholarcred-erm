import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        strict: false,
        noUnusedLocals: false,
        noUnusedParameters: false,
        skipLibCheck: true
      }
    }
  }
})
