import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  // 开发服务器配置
  server: {
    port: 5173,
    strictPort: true,
    middlewares: [
      (req, res, next) => {
        if (req.url !== '/' && !req.url.includes('.')) {
          req.url = '/';
        }
        next();
      }
    ]
  },

  // Base URL configuration
  base: process.env.NODE_ENV === 'production' ? './' : '/',  // 根据环境设置base

  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),  // 添加路径别名
    }
  },

  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
    // 添加构建优化
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 移除 console
        drop_debugger: true  // 移除 debugger
      }
    },
    rollupOptions: {
      output: {
        // 优化块分割
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // 其他大型依赖也可以分割
          ui: ['lucide-react', '@emailjs/browser']
        },
        // 控制文件名格式
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        }
      }
    },
    // 添加 chunk 大小警告限制
    chunkSizeWarningLimit: 1000
  },

  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: @import "@/styles/abstracts/_variables.scss";,  // 全局导入变量
      }
    },
    // CSS modules 配置
    modules: {
      generateScopedName: '[name][local]_[hash:base64:5]'
    }
  },

  // 优化配置
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  },

  // 预览配置
  preview: {
    port: 4173,
    strictPort: true,
    open: true,
    cors: true,
    middlewares: [    // 添加与server相同的中间件配置
      (req, res, next) => {
        if (req.url !== '/' && !req.url.includes('.')) {
          req.url = '/';
        }
        next();
      }
    ]
  }
});