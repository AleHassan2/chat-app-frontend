import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // WhatsApp Green Theme
        "wa-green": {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#25d366", // Main WhatsApp green
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // WhatsApp Dark Theme
        "wa-dark": {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          primary: "#111b21", // Main dark background
          secondary: "#202c33", // Secondary dark background
          tertiary: "#2a3942", // Chat background
        },
        // WhatsApp Light Theme
        "wa-light": {
          50: "#ffffff",
          100: "#f8f9fa",
          200: "#f1f3f4",
          300: "#e8eaed",
          400: "#dadce0",
          500: "#9aa0a6",
          600: "#80868b",
          700: "#5f6368",
          800: "#3c4043",
          900: "#202124",
          primary: "#ffffff",
          secondary: "#f0f2f5",
          tertiary: "#e5ddd5", // Chat background
        },
        // Status colors
        "wa-blue": "#53bdeb",
        "wa-teal": "#00bfa5",
        "wa-sent": "#dcf8c6", // Sent message background
        "wa-received": "#ffffff", // Received message background
      },
      backgroundImage: {
        "chat-pattern":
          "url('https://cdn.prod.website-files.com/66276facd0d1c621db99326c/6630d138ed682f5d89fc2eeb_whatsapp-chat-bg-pattern.png')",
        "dark-chat-pattern":
          "url('https://cdn.prod.website-files.com/66276facd0d1c621db99326c/6630c649b4cb89d52f3589a5_whatsapp-dark-bg-pattern.png')",
      },
      fontFamily: {
        wa: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      height: {
        "screen-mobile": "100dvh",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      boxShadow: {
        "wa-light":
          "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        "wa-medium":
          "0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
        "wa-heavy":
          "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [forms, typography, aspectRatio],
};
