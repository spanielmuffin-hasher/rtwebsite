import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EC4899",
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#EC4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8B5CF6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        amber: {
          DEFAULT: "#F59E0B",
          400: "#fbbf24",
          500: "#F59E0B",
          600: "#d97706",
        },
        rose: {
          DEFAULT: "#F43F5E",
          400: "#fb7185",
          500: "#F43F5E",
          600: "#e11d48",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        // Very light pink-tinted section backgrounds
        "pink-bg": "#fdf2f8",
        "lavender-bg": "#f5f3ff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "card": "0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 16px 48px -8px rgba(236,72,153,0.18), 0 4px 12px rgba(0,0,0,0.06)",
        "glass": "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "pink-glow": "0 0 40px rgba(236,72,153,0.25)",
        "violet-glow": "0 0 40px rgba(139,92,246,0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "float-1": "float1 14s ease-in-out infinite",
        "float-2": "float2 18s ease-in-out infinite",
        "float-3": "float3 12s ease-in-out infinite",
        "float-4": "float4 20s ease-in-out infinite",
        "pulse-blob": "pulseBlob 6s ease-in-out infinite",
        "drift": "drift 25s linear infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float1: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "25%": { transform: "translate(30px, -20px) scale(1.04)" },
          "50%": { transform: "translate(-20px, 30px) scale(0.97)" },
          "75%": { transform: "translate(20px, 10px) scale(1.02)" },
        },
        float2: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(-40px, 20px) scale(1.06)" },
          "66%": { transform: "translate(20px, -30px) scale(0.95)" },
        },
        float3: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(25px, -15px) scale(1.05)" },
        },
        float4: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1) rotate(0deg)" },
          "25%": { transform: "translate(-20px, 30px) scale(1.03) rotate(5deg)" },
          "75%": { transform: "translate(30px, -10px) scale(0.98) rotate(-3deg)" },
        },
        pulseBlob: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        drift: {
          "0%": { transform: "translateX(-100%) translateY(0)" },
          "100%": { transform: "translateX(200%) translateY(-50px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-in": "cubic-bezier(0.36, 0, 0.66, -0.56)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        "pink-violet-gradient": "linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 100%)",
        "hero-gradient": "linear-gradient(135deg, #ffffff 0%, #fdf4ff 40%, #fce7f3 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
