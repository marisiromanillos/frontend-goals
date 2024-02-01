import { url } from "inspector";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#067DFC",
        "primary-pink": "#FF1FF4",
        "gray-500": "#1F1F1F",
        "primary-100": "#CCCCCC",
        "primary-500": "#ffffff",
      },
      backgroundImage: (theme) => ({
        "gradient-black": "linear-gradient(147deg, #4d4855 0%, #000000 74%)",

      }),
      fontFamily: {
        monserrat: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
