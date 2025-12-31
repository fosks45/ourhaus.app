/**
 * Badge Component
 * Small status indicators and labels
 */

import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = 'neutral', size = 'md', children, className = '', ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full';

    const variantStyles = {
      primary: 'bg-primary-100 text-primary-700 border border-primary-200',
      secondary:
        'bg-secondary-100 text-secondary-700 border border-secondary-200',
      success:
        'bg-success-light text-success-dark border border-success-DEFAULT',
      warning:
        'bg-warning-light text-warning-dark border border-warning-DEFAULT',
      error: 'bg-error-light text-error-dark border border-error-DEFAULT',
      info: 'bg-info-light text-info-dark border border-info-DEFAULT',
      neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <span ref={ref} className={combinedClassName} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
