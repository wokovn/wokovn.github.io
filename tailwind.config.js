/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: '#F4F3EE',
          surface: '#FFFFFF',
          well: '#EAE8E0',
          ink: '#0C0C0E',
          muted: '#5D5D66',
        },
        obsidian: {
          bg: '#09090B',
          surface: '#111114',
          well: '#18181D',
          ink: '#F4F4F6',
          muted: '#9494A0',
        },
        signal: {
          DEFAULT: '#FF3B00',
          glow: '#FF5722',
        },
        telemetry: {
          green: '#00B86B',
          blue: '#0057FF',
          amber: '#F59E0B',
          crimson: '#E11D48',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: 0.45 },
          '50%': { opacity: 1 },
        }
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
