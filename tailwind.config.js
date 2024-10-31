/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      }
    },
  },
  plugins: [],
}