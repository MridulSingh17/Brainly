import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        gray: {
            100: 'eeeeef',
            200: '#e6e9ed',
            600: '#95989c',
          },
        purple: {
          200: '#d9ddee',
          500: '#9492db',
          300: '#7164c0',
        },
      },
    },
  },
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
}

export default config
