/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury dark navy base
        luxury: {
          50: '#faf8f3',
          100: '#f5f1e8',
          200: '#e8dcc8',
          300: '#d4c4a8',
          400: '#b8a889',
          500: '#a89968',
          600: '#8b7d5e',
          700: '#6b5d47',
          800: '#4a4337',
          900: '#2a2620',
        },
        // Rich gold and rose tones
        gold: {
          light: '#f4e4c1',
          main: '#d4af37',
          medium: '#c9a961',
          dark: '#8b7527',
          deep: '#6b5c1f',
        },
        rose: {
          light: '#f5e6e8',
          main: '#d4a5a5',
          medium: '#c97171',
          dark: '#8b5a5a',
          deep: '#5a3a3a',
        },
        // Navy backgrounds
        navy: {
          light: '#2a3f5f',
          main: '#1a2f4a',
          dark: '#0f1a2a',
          deeper: '#08111a',
          deepest: '#050810',
        },
        // Cream accents
        cream: {
          light: '#fef9f0',
          main: '#f5ede0',
          soft: '#ebe3d6',
        }
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #050810 0%, #0f1a2a 25%, #1a2f4a 50%, #0f1a2a 75%, #050810 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%)',
        'gradient-rose': 'linear-gradient(135deg, #d4a5a5 0%, #8b5a5a 100%)',
        'gradient-premium': 'linear-gradient(135deg, #d4af37 0%, #c97171 50%, #8b7527 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.4)',
        'glow-rose': '0 0 25px rgba(197, 113, 113, 0.3)',
        'luxury-soft': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'luxury-medium': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'luxury-hard': '0 12px 48px rgba(0, 0, 0, 0.5)',
        'gold-accent': '0 0 15px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
