import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aws: {
          orange: '#FF9900',
          'orange-hover': '#EC7211',
          squall: '#232F3E',
          deep: '#0F1B2A',
          blue: '#0073BB',
          light: '#F8FAFC',
          card: '#FFFFFF',
          darkcard: '#1E293B',
          darkbg: '#0F172A',
        },
      },
    },
  },
  plugins: [],
};

export default config;

