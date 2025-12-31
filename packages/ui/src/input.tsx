/**
 * Input Component
 * Accessible input fields with label, validation states, and help text
 */

import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`;
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const inputClasses = `
      block px-4 py-3 rounded-lg border-2 
      bg-white text-neutral-900
      transition-colors duration-200
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
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          {...props}
        />
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

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${React.useId()}`;
    const helperTextId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    const textareaClasses = `
      block px-4 py-3 rounded-lg border-2 
      bg-white text-neutral-900
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-1
      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-100
      resize-vertical
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
            htmlFor={textareaId}
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          {...props}
        />
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

Textarea.displayName = 'Textarea';
