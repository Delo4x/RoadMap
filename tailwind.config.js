/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        dark: {
          900: '#0a0a0f',
          800: '#121218',
          700: '#1a1a24',
          600: '#242430',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(45, 212, 191, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(45, 212, 191, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}