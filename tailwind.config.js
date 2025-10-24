/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fin.ai dark theme
        dark: {
          bg: '#050505',
          bgAlt: '#0a0a0a',
          border: '#1a1a1a',
          text: '#ffffff',
          textSecondary: '#b0b0b0',
        },
        // Blue accents (fin.ai primary)
        blue: {
          primary: '#1e40af',
          light: '#3b82f6',
          lighter: '#60a5fa',
          accent: '#0ea5e9',
        },
      },
      backgroundImage: {
        'gradient-fin': 'linear-gradient(135deg, #050505 0%, #0a0a0a 100%)',
        'gradient-blue': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'fin-soft': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'fin-medium': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'blue-glow': '0 0 20px rgba(30, 64, 175, 0.3)',
      }
    },
  },
  plugins: [],
}
