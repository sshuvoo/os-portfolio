import type { Config } from 'tailwindcss'
import scrollbarHide from 'tailwind-scrollbar-hide'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      cursor: {
        'custom-pointer': "url('/assets/cursor/pointer.png') 0 0, pointer",
        'custom-auto': "url('/assets/cursor/cursor-red.png') 0 0, auto",
      },
      backgroundImage: {
        primary: "url('/assets/background/sebastiaan-stam.jpg')",
        macos_1: "url('/assets/background/ventura-5.webp')",
      },
      colors: {
        light: '#F7F7F7',
      },
    },
  },
  plugins: [scrollbarHide],
}
export default config
