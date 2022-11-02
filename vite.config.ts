import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/main.scss";@import "src/assets/scss/variable.scss";`,

      },
      styl: {
        additionalData: ``
      }
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    proxy: {
      "/release": {
        target: 'http://110.42.184.111',
        rewrite: path => path.replace(/^\/release/, '')
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
