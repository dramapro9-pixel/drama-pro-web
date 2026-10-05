/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF7700',
          amber: '#FF9F00',
          dark: '#08090c',
          card: '#13151f',
          cardHover: '#1a1d2b',
          border: '#232736',
          borderHover: '#ff7700'
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'orange-glow': '0 0 25px -5px rgba(255, 119, 0, 0.4)',
        'orange-glow-lg': '0 0 40px -5px rgba(255, 119, 0, 0.5)'
      }
    },
  },
  plugins: [],
}
