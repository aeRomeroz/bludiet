import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Registrar el color solo como utilería de background
      backgroundColor: {
        primary: '#F8FAFC',
      },
      // Color para bordes que diferenciará elementos blancos sobre el fondo
      borderColor: {
        primary: '#BFBFBF',
      },
      // Color para texto negro personalizado (navbar, títulos, etc.)
      textColor: {
        'black-primary': '#191919',
      },
      // Ancho de borde personalizado: 0.5px
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
} satisfies Config;
