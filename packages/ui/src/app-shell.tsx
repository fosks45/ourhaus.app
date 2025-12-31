/**
 * AppShell Component
 * Main application layout with navigation and content area
 */

import * as React from 'react';

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ children, header, footer, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col min-h-screen ${className}`}
        {...props}
      >
        {header}
        <div className="flex-1">{children}</div>
        {footer}
      </div>
    );
  }
);

AppShell.displayName = 'AppShell';

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  sticky?: boolean;
}

export const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  ({ children, sticky = true, className = '', ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`bg-white border-b border-neutral-200 z-10 ${sticky ? 'sticky top-0' : ''} ${className}`}
        {...props}
      >
        {children}
      </header>
    );
  }
);

AppHeader.displayName = 'AppHeader';

export interface AppNavProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const AppNav = React.forwardRef<HTMLElement, AppNavProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={`px-4 py-3 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

AppNav.displayName = 'AppNav';

export interface AppFooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const AppFooter = React.forwardRef<HTMLElement, AppFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={`bg-white border-t border-neutral-200 px-4 py-6 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

AppFooter.displayName = 'AppFooter';
