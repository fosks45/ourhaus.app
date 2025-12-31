/**
 * List Component
 * Reusable list with items and empty state support
 */

import * as React from 'react';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: 'default' | 'bordered' | 'divided';
  children: React.ReactNode;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ variant = 'default', children, className = '', ...props }, ref) => {
    const baseStyles = 'space-y-0';

    const variantStyles = {
      default: '',
      bordered: 'border-2 border-neutral-200 rounded-xl overflow-hidden',
      divided: '',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
      <ul ref={ref} className={combinedClassName} {...props}>
        {children}
      </ul>
    );
  }
);

List.displayName = 'List';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  variant?: 'default' | 'bordered' | 'divided';
  children: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ variant = 'default', children, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-3 transition-colors';

    const variantStyles = {
      default: 'hover:bg-neutral-50',
      bordered: 'hover:bg-neutral-50',
      divided:
        'border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
      <li ref={ref} className={combinedClassName} {...props}>
        {children}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
