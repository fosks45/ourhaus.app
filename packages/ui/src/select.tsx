/**
 * Select Component
 * Accessible dropdown select with label and validation states
 */

import * as React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      className = '',
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${React.useId()}`;
    const helperTextId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;

    const selectClasses = `
      block px-4 py-3 pr-10 rounded-lg border-2 
      bg-white text-neutral-900
      transition-colors duration-200
      appearance-none
      focus:outline-none focus:ring-2 focus:ring-offset-1
      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-100
      ${
        error
          ? 'border-error-DEFAULT focus:border-error-DEFAULT focus:ring-error-light'
          : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200'
      }
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperTextId : undefined
            }
            {...props}
          >
            {children}
          </select>
          {/* Dropdown arrow icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm text-error-DEFAULT"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperTextId} className="mt-2 text-sm text-neutral-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
