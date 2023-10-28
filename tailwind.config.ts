import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    borderRadius: {
      none: '0',
      sm: '2px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    // https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    colors: {
      'neutral-100': '#FFFFFF',
      'neutral-200': '#F8F7F5',
      'neutral-300': '#F5F3F0',
      'neutral-400': '#EAE7E3',
      'neutral-500': '#DFDAD3',
      'neutral-600': '#CAC3B8',
      'neutral-700': '#B9B1A6',
      'neutral-800': '#79736A',
      'neutral-900': '#000000',
      'primary-50': '#F2F2FD',
      'primary-100': '#E5E5FF',
      'primary-200': '#B3B3FF',
      'primary-300': '#8080FF',
      'primary-400': '#4D4DFF',
      'primary-500': '#0000D0',
      'primary-600': '#0000A6',
      'primary-700': '#00007D',
      'primary-800': '#000053',
      'primary-900': '#00002A',
      'orange-300': '#FF5722',
      transparent: 'transparent',
    },
    extend: {
      animation: {
        'toast-slide-in-out':
          'toast-slide-in 0.3s ease-out, toast-slide-out 0.3s 3s ease-in forwards',
      },
      aria: {
        invalid: 'invalid="true"',
      },
      boxShadow: {
        3: '21.4px 36px 35.8px -4.3px rgba(199, 197, 193, 0.07), 13.9px 23.4px 23.3px -3.7px rgba(199, 197, 193, 0.10), 8.5px 14.3px 14.2px -3.1px rgba(199, 197, 193, 0.13), 4.9px 8.2px 8.2px -2.5px rgba(199, 197, 193, 0.16), 2.6px 4.4px 4.4px -1.8px rgba(199, 197, 193, 0.19), 1.4px 2.3px 2.3px -1.2px rgba(199, 197, 193, 0.22), 0.8px 1.3px 1.3px -0.6px rgba(199, 197, 193, 0.25), 0.4px 0.7px 0.7px 0px rgba(199, 197, 193, 0.28);',
      },
      keyframes: {
        'toast-slide-in': {
          from: { opacity: '0.8', transform: 'translateX(calc(100% + 48px))' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'toast-slide-out': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0.8', transform: 'translateX(calc(100% + 48px))' },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({ 'stroke-dashoffset': (value) => ({ strokeDashoffset: value }) });
    }),
  ],
} satisfies Config;
