/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paddle: {
          bg: "#0b1011",
          card: "#0e1516",
          surface: "#121a1b",
          elevated: "#182223",
          border: "#202c2e",
          borderLight: "#2e3e41",
          yellow: "#fff800",
          yellowHover: "#fffa66",
          muted: "#859496",
          text: "#f4f6f8",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 25px rgba(255, 248, 0, 0.25)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.2)',
        'paddle-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

