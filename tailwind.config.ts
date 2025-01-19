import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'v-dark-gray': 'hsl(0, 0%, 17%)',
        'dark-gray': 'hsl(0, 0%, 59%)',
      },
      backgroundImage: {
        mobile: "url('/images/pattern-bg-mobile.png')",
        desktop: "url('/images/pattern-bg-desktop.png')",
      },
    },
  },
  plugins: [],
} satisfies Config
