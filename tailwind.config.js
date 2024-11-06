/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 保持现有的颜色配置
      colors: {
        'primary': {
          DEFAULT: '#2563eb',
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
        'secondary': {
          DEFAULT: '#64748b',
          light: '#94a3b8',
          dark: '#475569',
        },
        'text': {
          DEFAULT: '#1f2937',
          light: '#4b5563',
        },
        'gray': {
          DEFAULT: '#6b7280',
          light: '#e5e7eb',
          dark: '#374151',
        }
      },
      // 添加自定义容器配置
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      // 自定义间距
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      // 自定义最大宽度
      maxWidth: {
        'screen-xl': '1440px',
        'screen-2xl': '1600px',
      },
    },
  },
  plugins: [],
}