import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#22312f",
        leaf: "#2f6f5e",
        mint: "#e9f5ef",
        cream: "#fbfaf6",
        coral: "#d86f45"
      }
    }
  },
  plugins: []
};

export default config;
