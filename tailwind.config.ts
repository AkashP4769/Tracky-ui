import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        hegarty: ["BBH Hegarty", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
