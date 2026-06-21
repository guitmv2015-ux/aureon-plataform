import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/payload/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        // Paleta institucional "Aureon" — tinta quase-preta + bronze envelhecido.
        // Nomes próprios em vez de gray-900/accent genéricos: cada token tem um papel fixo.
        ink: {
          DEFAULT: "#0B0D10", // fundo primário — tinta
          soft: "#0E1014",
        },
        panel: "#12151A", // fundo de seções alternadas
        elevated: "#171B21", // cards, modais
        line: "rgba(255,255,255,0.08)", // hairline rules
        "line-strong": "rgba(255,255,255,0.14)",
        ivory: "#ECEAE3", // texto principal sobre fundo escuro
        slate: {
          DEFAULT: "#8B8F97", // texto secundário
          dim: "#5D6066",
        },
        brass: {
          DEFAULT: "#B68A4E", // assinatura visual — bronze envelhecido (não dourado brilhante)
          light: "#D4AC72",
          dark: "#8C6936",
          50: "#F7EFE2",
        },

        // shadcn/ui bridge tokens (HSL via CSS vars em globals.css)
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
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Escala expandida para headlines institucionais
        "display-2xl": ["6.25rem", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-xl": ["4.75rem", { lineHeight: "1.0", letterSpacing: "-0.015em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.22em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        prose: "68ch",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade": "radial-gradient(60% 60% at 50% 0%, rgba(182,138,78,0.14), transparent)",
      },
      backgroundSize: {
        grid: "64px 64px",
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
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "draw-line": "draw-line 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        ticker: "ticker 38s linear infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
