// 配置说明：https://cn.vitejs.dev/config/
// https://github.com/ziyoren/electron-vite-vue2
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default {
  build: {
    chunkSizeWarningLimit:1500
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json', '.css', '.ts', '.jsx', '.wasm']
  },
  base: './',
  plugins: [createVuePlugin()]
}
