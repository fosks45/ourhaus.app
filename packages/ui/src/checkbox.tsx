/**
 * Checkbox Component
 * Accessible checkbox with label and touch-friendly target (≥44px)
 */

import * as React from 'react';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, error, className = '', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${React.useId()}`;
    const helperTextId = `${checkboxId}-helper`;
    const errorId = `${checkboxId}-error`;

    const checkboxClasses = `
      h-5 w-5 rounded border-2 text-primary-600
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? 'border-error-DEFAULT' : 'border-neutral-300'}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <div>
        <div className="flex items-start">
          {/* Touch target wrapper - min 44px */}
          <div className="flex items-center h-11">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={checkboxClasses}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error ? errorId : helperText ? helperTextId : undefined
              }
              {...props}
            />
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className="ml-3 block text-sm text-neutral-900 cursor-pointer"
            >
              <span className="font-medium">{label}</span>
              {helperText && !error && (
                <span className="block text-neutral-600 mt-1">
                  {helperText}
                </span>
              )}
            </label>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="mt-2 ml-8 text-sm text-error-DEFAULT"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
