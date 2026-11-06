import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#0B1329",
          900: "#0B1329",
          800: "#132147",
          700: "#1B2F63",
        },
        alabaster: {
          DEFAULT: "#F8FAFC",
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
        },
        amber: {
          accent: "#F59E0B",
          hover: "#D97706",
          light: "#FEF3C7",
        },
        background: "#F8FAFC",
        foreground: "#0B1329",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0B1329",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0B1329",
        },
        primary: {
          DEFAULT: "#0B1329",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          foreground: "#0B1329",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#475569",
        },
        accent: {
          DEFAULT: "#F59E0B",
          foreground: "#0B1329",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#0B1329",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
