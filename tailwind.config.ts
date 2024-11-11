import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
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
        primary: '#007AFF',
        'light-background': '#F7F7F7',
        'dark-background': '#212121',
        'light-foreground': '#e5e5e5',
        'dark-foreground': '#282828',
        'dark-text': '#e4e4e4',
        'light-text': '#191919',
        'dark-input-bg': '#353535',
        'light-input-bg': '#e5e5e5',
        'dark-border': '#191919',
        'light-border': '#cacaca',
        'dark-hover-bg': '#383838',
        'dark-context-bg': '#343434',
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
