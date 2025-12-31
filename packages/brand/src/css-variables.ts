/**
 * CSS Variables Generator
 * Converts design tokens to CSS custom properties
 */

import { colors } from './colors';
import { spacing, borderRadius } from './spacing';
import { fontSize, fontWeight, lineHeight, letterSpacing } from './typography';
import { boxShadow } from './elevation';

/**
 * Flattens nested token objects into CSS variable format
 * Example: { primary: { 500: '#0ea5e9' } } => { '--color-primary-500': '#0ea5e9' }
 */
function flattenTokens(
  obj: Record<string, string | Record<string, string>>,
  prefix: string = '',
  separator: string = '-'
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}${separator}${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenTokens(value, newKey, separator));
    } else {
      result[`--${newKey}`] = String(value);
    }
  }

  return result;
}

/**
 * Generate CSS variables object for all design tokens
 */
export function generateCSSVariables(): Record<string, string> {
  return {
    ...flattenTokens(colors, 'color'),
    ...flattenTokens(spacing, 'spacing'),
    ...flattenTokens(borderRadius, 'radius'),
    ...flattenTokens(fontSize, 'font-size'),
    ...flattenTokens(fontWeight, 'font-weight'),
    ...flattenTokens(lineHeight, 'line-height'),
    ...flattenTokens(letterSpacing, 'letter-spacing'),
    ...flattenTokens(boxShadow, 'shadow'),
  };
}

/**
 * Generate CSS string with :root selector containing all CSS variables
 */
export function generateCSSString(): string {
  const variables = generateCSSVariables();
  const cssVars = Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `:root {\n${cssVars}\n}`;
}

/**
 * Export individual token categories as CSS variables
 */
export const cssVariables = {
  colors: flattenTokens(colors, 'color'),
  spacing: flattenTokens(spacing, 'spacing'),
  borderRadius: flattenTokens(borderRadius, 'radius'),
  fontSize: flattenTokens(fontSize, 'font-size'),
  fontWeight: flattenTokens(fontWeight, 'font-weight'),
  lineHeight: flattenTokens(lineHeight, 'line-height'),
  letterSpacing: flattenTokens(letterSpacing, 'letter-spacing'),
  boxShadow: flattenTokens(boxShadow, 'shadow'),
};
