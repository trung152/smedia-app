import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#71A894",
        text: "#303031",
        accent: "#66645E",
        "primary-900": "#006657",
        "primary-800": "#008577",
        "primary-700": "#009485",
        "primary-600": "#00a89a",
        "primary-500": "#00b3a7",
        "primary-400": "#00c2b8",
        "primary-300": "#00ccc5",
        "primary-200": "#73ddd8",
        "primary-100": "#aeeae7",
        "primary-50": "#dff6f6",
        "primary-10": "#f3fbfb",
        "secondary-900": "#0057a8",
        "secondary-800": "#0077c7",
        "secondary-700": "#0087db",
        "secondary-600": "#009cf0",
        "secondary-500": "#0af",
        "secondary-400": "#00b7ff",
        "secondary-300": "#00c3ff",
        "secondary-200": "#70d4ff",
        "secondary-100": "#ade5ff",
        "secondary-50": "#e0f6ff",
      },
      fontSize: {
        normal: "12px",
        subtitle: "24px",
        large: "64px",
        largeMobile: "54px",
        header: "48px",
        headerMobile: "28px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        typewriter: {
          "0%": { left: "0%" },
          "100%": { left: "100%" },
        },
        blink: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        typewriter: "typewriter 2s steps(11) forwards",
        caret: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
