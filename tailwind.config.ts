import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "all-angles":
          "0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        "regal-blue": "rgb(65,105,225)",
        greye: "rgb(221,221,221)",
        darkgrey: "rgb(68,68,68)",
      },
    },
  },
  plugins: [],
};
export default config;
