import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Lato"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif']
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
} satisfies Config;
