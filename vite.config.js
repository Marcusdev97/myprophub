import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  // 开发服务器配置
  server: {
    port: 5173,
    strictPort: true,
    host: true, // 添加这个以支持网络访问
    middleware: [
      (req, res, next) => {
        // 简化路由处理
        if (!req.url.match(/\.\w+$/)) {
          req.url = '/';
        }
        next();
      }
    ]
  },

  // 基础 URL 配置
  base: '/',

  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },

  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
    minify: 'terser',
    sourcemap: false, // 生产环境不生成 sourcemap
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', '@emailjs/browser']
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name].[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name].[hash][extname]`;
          }
          if (/css|scss/i.test(extType)) {
            return `assets/css/[name].[hash][extname]`;
          }
          return `assets/[ext]/[name].[hash][extname]`;
        }
      },
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    chunkSizeWarningLimit: 1500,
    emptyOutDir: true
  },

  // CSS 配置
  css: {
    devSourcemap: true, // 开发环境启用 sourcemap
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@use "@/styles/abstracts" as *;`
      }
    },
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      localsConvention: 'camelCase'
    }
  },

  // 依赖优化
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@emailjs/browser'
    ],
    exclude: ['@vercel/analytics']
  },

  // 预览配置
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // 实验性功能
  experimental: {
    renderBuiltUrl: (filename, { hostType }) => {
      if (hostType === 'js') {
        return {
          runtime: `window.__assetsPath + ${JSON.stringify(filename)}`
        }
      }
      return filename
    }
  }
});