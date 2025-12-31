/**
 * Page Component
 * Consistent page wrapper with header and content area
 */

import * as React from 'react';

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`min-h-screen bg-background-secondary ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Page.displayName = 'Page';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`bg-white border-b border-neutral-200 px-4 py-6 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={`text-2xl sm:text-3xl font-bold text-neutral-900 ${className}`}
        {...props}
      >
        {children}
      </h1>
    );
  }
);

PageTitle.displayName = 'PageTitle';

export interface PageContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const PageContent = React.forwardRef<HTMLElement, PageContentProps>(
  ({ children, maxWidth = 'xl', className = '', ...props }, ref) => {
    const maxWidthClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    };

    return (
      <main
        ref={ref}
        className={`${maxWidthClasses[maxWidth]} mx-auto px-4 py-6 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </main>
    );
  }
);

PageContent.displayName = 'PageContent';
