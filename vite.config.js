import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // 配置别名 @ 指向 src 目录
    },
  },
  build:{
    sourcemap: true,
  }
})