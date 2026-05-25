import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════
      // COLOR PALETTE — Bluebird Brand
      // ═══════════════════════════════════════════
      colors: {
        // Brand Colors
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // Cyan Accent (Fiber Optic Light)
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        // Dark Navy (Primary Backgrounds)
        navy: {
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
          950: "#020617",
        },
        // Semantic Colors
        success: {
          light: "#dcfce7",
          DEFAULT: "#22c55e",
          dark: "#15803d",
        },
        warning: {
          light: "#fef9c3",
          DEFAULT: "#eab308",
          dark: "#a16207",
        },
        danger: {
          light: "#fee2e2",
          DEFAULT: "#ef4444",
          dark: "#b91c1c",
        },
        info: {
          light: "#dbeafe",
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
        },
        // Network Status Colors
        network: {
          online: "#10b981",     // Emerald — Online
          offline: "#ef4444",    // Red — Offline
          warning: "#f59e0b",    // Amber — Warning
          maintenance: "#8b5cf6", // Violet — Maintenance
          unknown: "#6b7280",    // Gray — Unknown
        },
        // ShadCN overrides
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // ═══════════════════════════════════════════
      // TYPOGRAPHY
      // ═══════════════════════════════════════════
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace",
        ],
        bangla: [
          "var(--font-noto-sans-bengali)",
          "Bangla",
          "SolaimanLipi",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],  // 10px
        xs: ["0.75rem", { lineHeight: "1rem" }],           // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }],        // 14px
        base: ["1rem", { lineHeight: "1.5rem" }],           // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],        // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }],         // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }],          // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],     // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],       // 36px
        "5xl": ["3rem", { lineHeight: "1.1" }],             // 48px
        "6xl": ["3.75rem", { lineHeight: "1.1" }],          // 60px
        "7xl": ["4.5rem", { lineHeight: "1.05" }],          // 72px
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // ═══════════════════════════════════════════
      // SPACING SYSTEM (4px base)
      // ═══════════════════════════════════════════
      spacing: {
        "4px": "4px",
        "8px": "8px",
        "12px": "12px",
        "16px": "16px",
        "20px": "20px",
        "24px": "24px",
        "32px": "32px",
        "40px": "40px",
        "48px": "48px",
        "64px": "64px",
        "80px": "80px",
        "96px": "96px",
        "128px": "128px",
      },

      // ═══════════════════════════════════════════
      // BORDER RADIUS
      // ═══════════════════════════════════════════
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        full: "9999px",
      },

      // ═══════════════════════════════════════════
      // SHADOWS (Soft, layered)
      // ═══════════════════════════════════════════
      boxShadow: {
        // Elevation levels
        "elevation-1": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "elevation-2": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "elevation-3": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "elevation-4": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "elevation-5": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        // Brand glow
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-brand": "0 0 20px rgba(14, 165, 233, 0.3)",
        // Card shadows
        "card": "0 0 0 1px rgb(0 0 0 / 0.03), 0 2px 8px rgb(0 0 0 / 0.04)",
        "card-hover": "0 0 0 1px rgb(0 0 0 / 0.03), 0 8px 24px rgb(0 0 0 / 0.08)",
        // Dark mode shadows
        "dark-card": "0 0 0 1px rgb(255 255 255 / 0.05), 0 2px 8px rgb(0 0 0 / 0.2)",
        "dark-card-hover": "0 0 0 1px rgb(255 255 255 / 0.05), 0 8px 24px rgb(0 0 0 / 0.4)",
      },

      // ═══════════════════════════════════════════
      // ANIMATIONS (Soft, purposeful)
      // ═══════════════════════════════════════════
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "50": "50ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
        "1000": "1000ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(6, 182, 212, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out-expo",
        "fade-in-up": "fade-in-up 0.4s ease-out-expo",
        "scale-in": "scale-in 0.2s ease-out-expo",
        "slide-in-right": "slide-in-right 0.3s ease-out-expo",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },

      // ═══════════════════════════════════════════
      // Z-INDEX SCALE
      // ═══════════════════════════════════════════
      zIndex: {
        "0": "0",
        "1": "1",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
        "dropdown": "1000",
        "sticky": "1020",
        "fixed": "1030",
        "modal-backdrop": "1040",
        "modal": "1050",
        "popover": "1060",
        "tooltip": "1070",
        "toast": "1080",
      },

      // ═══════════════════════════════════════════
      // BACKDROP BLUR (Glassmorphism)
      // ═══════════════════════════════════════════
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
