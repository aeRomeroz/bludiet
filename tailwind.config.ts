import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F8FAFC',
        'black-primary': '#191919',
        'border-primary': '#BFBFBF',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
} satisfies Config;
