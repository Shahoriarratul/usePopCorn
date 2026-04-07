/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}", "./app/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#efe7ff",
          100: "#dac7ff",
          200: "#c39dff",
          300: "#a97aff",
          400: "#8e59fb",
          500: "#6741d9",
          600: "#5a35c5",
          700: "#4b2fa1",
          800: "#3c267e",
          900: "#2b1b5b",
        },
        ink: {
          950: "#0f1115",
          900: "#171a21",
          850: "#1f232b",
          800: "#252a33",
          700: "#2f3641",
          600: "#3d4554",
        },
      },
      boxShadow: {
        panel: "0 20px 60px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};