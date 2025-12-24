/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        // Premium Light Theme Palette
        primary: {
          50: '#f4f7fe',
          100: '#eef2ff',
          200: '#e0e7ff',
          300: '#c7d2fe',
          400: '#a5b4fc', // Soft Indigo
          500: '#818cf8',
          600: '#6366f1', // Main Primary
          700: '#4f46e5',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9', // Soft Fuschia
          500: '#d946ef',
          600: '#c026d3',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4', // Mint
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        surface: {
          50: '#ffffff',
          100: '#f8fafc', // Main Background
          200: '#f1f5f9', // Secondary Background
          300: '#e2e8f0', // Borders
        },
        text: {
          primary: '#1e293b', // Slate 800
          secondary: '#64748b', // Slate 500
          light: '#94a3b8', // Slate 400
        },
        // Dark Mode Palette
        dark: {
          primary: {
            50: '#1e1b4b',
            100: '#312e81',
            200: '#3730a3',
            300: '#4338ca',
            400: '#4f46e5',
            500: '#6366f1',
            600: '#818cf8',
            700: '#a5b4fc',
          },
          secondary: {
            50: '#4a044e',
            100: '#701a75',
            200: '#86198f',
            300: '#a21caf',
            400: '#c026d3',
            500: '#d946ef',
            600: '#e879f9',
          },
          accent: {
            50: '#134e4a',
            100: '#115e59',
            200: '#0f766e',
            300: '#0d9488',
            400: '#14b8a6',
            500: '#2dd4bf',
          },
          surface: {
            50: '#0f172a', // Main Dark Background
            100: '#1e293b', // Secondary Dark Background
            200: '#334155', // Borders
            300: '#475569', // Elevated surfaces
          },
          text: {
            primary: '#f1f5f9', // Slate 100
            secondary: '#cbd5e1', // Slate 300
            light: '#94a3b8', // Slate 400
          }
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', // Soft minimal
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #2dd4bf 0%, #3b82f6 100%)',
        'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 15px rgba(99, 102, 241, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
