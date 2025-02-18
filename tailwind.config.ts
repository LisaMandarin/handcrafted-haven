import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-yellow-1": "#ffe6a7",
        "custom-yellow-2": "#bb9457",
        "custom-brown-1": "99582a",
        "custom-brown-2": "6f1d1b",
        "custom-dark-brown": "432818",
      },
    },
  },
  plugins: [],
} satisfies Config;
