import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
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

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84% 60%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          
        },
      
        animation: {
          pageEnter: "pageEnter 0.6s ease-out",
          blurEnter: "blurEnter 0.7s ease-out",
          zoomIn: "zoomIn 0.5s ease-out",
          zoomOut: "zoomOut 0.7s ease-out",
          fadeRotate: "fadeRotate 0.6s ease-out",
          softPop: "softPop 0.4s ease-out",
          slideLeft: "slideLeft 0.6s ease-out",
          slideRight: "slideRight 0.6s ease-out",
          slideScale: "slideScale 0.7s ease-out",
          float: "float 3s ease-in-out infinite",
        },
      },

      borderRadius: {
        lg: "calc(var(--radius) - 2px)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
      },

      boxShadow: {
        card: "0 2px 20px rgba(0,0,0,0.06)",
      },
    },
  },

  plugins: [tailwindcssAnimate],
} satisfies Config;
