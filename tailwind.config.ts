import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        lock: "url('/assets/background/helios-light.jpg')",
      },
      cursor: {
        'custom-pointer': "url('/assets/cursor/Link.png') 0 0, pointer",
        'custom-auto': "url('/assets/cursor/Normal.png') 0 0, auto",
      },
      colors: {
        light: '#F7F7F7',
      },
      animation: {
        'wallpaper-fade': 'fadeInOut 5s linear infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
