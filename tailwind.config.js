module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
      },
      center: true,
    },
    extend: {
      colors: {
        gray: {
          main: "#a0aec0"
        },
        red: {
          main: "#862121"
        }
      }
    },
  },
  plugins: [],
}
