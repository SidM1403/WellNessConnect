/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8', // Sky blue
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          400: '#a78bfa', // Soft purple
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: {
          400: '#2dd4bf', // Teal
          500: '#14b8a6',
          600: '#0d9488',
        },
        coral: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        lime: {
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
        },
        // Surface colors
        surface: {
          light: '#f8fafc',
          dark: '#020617',
        },
      },
      backgroundImage: {
        'wellness-radial': 
          'radial-gradient(circle at top left, rgba(59, 130, 246, 0.15), transparent 55%), ' +
          'radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.15), transparent 55%), ' +
          'radial-gradient(circle at top right, rgba(45, 212, 191, 0.1), transparent 60%)',
        'hero-gradient': 
          'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 35%, #f0fdfa 70%, #ecfdf5 100%)',
        'card-gradient':
          'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        'button-gradient':
          'linear-gradient(90deg, #38bdf8 0%, #8b5cf6 100%)',
      },
      boxShadow: {
        'soft-xl': '0 10px 50px -12px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(59, 130, 246, 0.3)',
        'glow-hover': '0 0 25px rgba(59, 130, 246, 0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
