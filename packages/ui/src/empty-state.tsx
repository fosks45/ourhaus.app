/**
 * EmptyState Component
 * Display when there's no content to show
 */

import * as React from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, icon, action, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`text-center py-12 px-6 ${className}`}
        {...props}
      >
        {icon && (
          <div className="flex justify-center mb-4 text-neutral-400">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-neutral-600 mb-6 max-w-md mx-auto">
            {description}
          </p>
        )}
        {action && <div className="flex justify-center">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
