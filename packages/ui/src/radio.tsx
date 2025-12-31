/**
 * Radio Component
 * Accessible radio button with label and touch-friendly target (≥44px)
 */

import * as React from 'react';

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, helperText, error, className = '', id, ...props }, ref) => {
    const radioId = id || `radio-${React.useId()}`;
    const helperTextId = `${radioId}-helper`;
    const errorId = `${radioId}-error`;

    const radioClasses = `
      h-5 w-5 border-2 text-primary-600
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
              type="radio"
              id={radioId}
              className={radioClasses}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error ? errorId : helperText ? helperTextId : undefined
              }
              {...props}
            />
          </div>
          {label && (
            <label
              htmlFor={radioId}
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

Radio.displayName = 'Radio';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, error, children, className = '', ...props }, ref) => {
    const groupId = `radio-group-${React.useId()}`;
    const errorId = `${groupId}-error`;

    return (
      <div ref={ref} role="radiogroup" {...props}>
        {label && (
          <div className="block text-sm font-medium text-neutral-700 mb-3">
            {label}
          </div>
        )}
        <div className={`space-y-3 ${className}`}>{children}</div>
        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm text-error-DEFAULT"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
