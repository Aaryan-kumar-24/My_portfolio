/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepBlack: '#0a0a0a',
        graphite: '#1a1a1a',
        electricBlue: '#00e5ff',
        neonCyan: '#00ffcc',
        purpleGlow: '#9d00ff',
        softEmerald: '#00ff66'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
