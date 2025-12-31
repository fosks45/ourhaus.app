/**
 * Section Component
 * Content sections with optional titles and descriptions
 */

import * as React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <section ref={ref} className={`space-y-6 ${className}`} {...props}>
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SectionHeader = React.forwardRef<
  HTMLDivElement,
  SectionHeaderProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <div ref={ref} className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4';
}

export const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  SectionTitleProps
>(({ children, as = 'h2', className = '', ...props }, ref) => {
  const Component = as;

  const sizeClasses = {
    h2: 'text-xl sm:text-2xl',
    h3: 'text-lg sm:text-xl',
    h4: 'text-base sm:text-lg',
  };

  return (
    <Component
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={`${sizeClasses[as]} font-bold text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

SectionTitle.displayName = 'SectionTitle';

export interface SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  SectionDescriptionProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm text-neutral-600 mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

SectionDescription.displayName = 'SectionDescription';
