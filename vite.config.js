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
  base: '/',

  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),  // 添加路径别名
    }
  },

  // 静态资源配置
  publicDir: 'public',

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
          ui: ['lucide-react', '@emailjs/browser']
        },
        // 静态资源处理
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // 性能优化
    reportCompressedSize: false, // 提高大型项目构建性能
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // 生产环境不生成 sourcemap
  },

  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        charset: false // 避免 CSS @charset 警告
      }
    },
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    // 生产环境下压缩 CSS
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')
      ]
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
    exclude: [], // 排除不需要预构建的依赖
  },

  // 预览配置
  preview: {
    port: 4173,
    strictPort: true,
    open: true,
    cors: true,
    // 添加预览服务器中间件
    middlewares: [
      (req, res, next) => {
        // 处理客户端路由
        if (req.url !== '/' && !req.url.includes('.')) {
          req.url = '/';
        }
        next();
      }
    ]
  },

  // Esbuild 配置
  esbuild: {
    loader: 'jsx', // 允许导入 jsx 文件
    include: /\.[jt]sx?$/, // 包含的文件
    exclude: [], // 排除的文件
  }
});