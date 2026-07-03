import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF4E1',
          100: '#F5E6C8',
          300: '#E4C267',
          500: '#C9A227',
          600: '#B8860B',
          700: '#8B6F1F',
          900: '#4A3B0F',
        },
        ink: {
          900: '#141414',
          700: '#2B2B2B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

export default config
