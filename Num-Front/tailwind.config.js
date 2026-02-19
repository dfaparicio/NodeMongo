/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f4af25",
        "primary-light": "#f6c35e",
        "primary-dark": "#c78d1a",
        "background-light": "#f8f7f5",
        "background-dark": "#221c10",
        void: "#0f0c08",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        "cosmic-gradient":
          "linear-gradient(135deg, rgba(34,28,16,0.95) 0%, rgba(15,12,8,1) 100%)",
      },
    },
  },
  plugins: [],
};
