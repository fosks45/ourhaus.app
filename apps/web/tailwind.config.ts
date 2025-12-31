import type { Config } from 'tailwindcss';
import {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
  boxShadow,
} from '@ourhaus/brand';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
      },
      spacing,
      borderRadius,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      fontFamily: {
        sans: fontFamily.sans,
        mono: fontFamily.mono,
      },
      boxShadow,
    },
  },
  plugins: [],
};

export default config;
