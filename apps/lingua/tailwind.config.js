const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#9e4545",
          base: "#A31D1D",
          dark: "#6D2323",
        },
        secondary: {
          light: '#FEF9E1',
          base: '#E5D0AC',
          dark: '#E5D0AC',
        },
        white: '#ffffff',
        black: '#000000',
      },
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
    },
  },
  plugins: [],
};
