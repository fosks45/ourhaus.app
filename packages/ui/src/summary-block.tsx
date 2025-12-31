/**
 * SummaryBlock Component
 * Display key statistics and metrics
 */

import * as React from 'react';

export interface SummaryBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const SummaryBlock = React.forwardRef<HTMLDivElement, SummaryBlockProps>(
  (
    {
      label,
      value,
      change,
      icon,
      variant = 'default',
      className = '',
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-white border-neutral-200',
      primary: 'bg-primary-50 border-primary-200',
      success: 'bg-success-light border-success-DEFAULT',
      warning: 'bg-warning-light border-warning-DEFAULT',
      error: 'bg-error-light border-error-DEFAULT',
    };

    const trendColors = {
      up: 'text-success-DEFAULT',
      down: 'text-error-DEFAULT',
      neutral: 'text-neutral-500',
    };

    const trendIcons = {
      up: '↑',
      down: '↓',
      neutral: '→',
    };

    return (
      <div
        ref={ref}
        className={`border-2 rounded-xl p-6 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-600 mb-1">{label}</p>
            <p className="text-3xl font-bold text-neutral-900">{value}</p>
            {change && (
              <p
                className={`text-sm font-medium mt-2 ${trendColors[change.trend]}`}
              >
                <span className="mr-1">{trendIcons[change.trend]}</span>
                {change.value}
              </p>
            )}
          </div>
          {icon && <div className="ml-4 text-neutral-400">{icon}</div>}
        </div>
      </div>
    );
  }
);

SummaryBlock.displayName = 'SummaryBlock';

export interface SummaryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export const SummaryGrid = React.forwardRef<HTMLDivElement, SummaryGridProps>(
  ({ children, columns = 3, className = '', ...props }, ref) => {
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <div
        ref={ref}
        className={`grid gap-4 ${columnClasses[columns]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SummaryGrid.displayName = 'SummaryGrid';
