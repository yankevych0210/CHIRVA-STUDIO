/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    // hover: styles apply only on devices that can really hover — no "sticky"
    // hover states after a tap on iOS / Android
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      screens: {
        xs: '380px',
        // Phone turned sideways: little height, lots of width
        short: { raw: '(orientation: landscape) and (max-height: 500px)' },
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        script: ['var(--font-script)'],
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'modal-in': {
          from: { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
        'modal-in': 'modal-in 0.45s cubic-bezier(0.19, 1, 0.22, 1) both',
      },
    },
  },
  plugins: [],
}
