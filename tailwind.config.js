/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#FFFDF7',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          dark: '#121316',
          yellow: '#FFE600',
          pink: '#FF6584',
          cyan: '#00F0FF',
          purple: '#A388EE',
          green: '#4ECCA3',
          orange: '#FF9234',
          lime: '#CCFF00',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'neo-sm': '2px 2px 0px 0px #121316',
        'neo': '4px 4px 0px 0px #121316',
        'neo-lg': '6px 6px 0px 0px #121316',
        'neo-xl': '8px 8px 0px 0px #121316',
        'neo-2xl': '12px 12px 0px 0px #121316',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'spin-slow': 'spinSlow 16s linear infinite',
      }
    },
  },
  plugins: [],
}
