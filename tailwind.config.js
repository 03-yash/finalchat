/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "600px", // Small devices (phones)
      md: "768px", // Medium devices (tablets)
      lg: "992px", // Large devices (laptops/desktops)
      xl: "1200px", // Extra large devices (large laptops/desktops)
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        teko: ["Teko", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },},
  },
  plugins: [require("tailwind-scrollbar")],
}

