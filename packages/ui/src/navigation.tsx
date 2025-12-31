/**
 * Navigation Components
 * Responsive navigation for mobile (bottom nav) and desktop (sidebar)
 */

import * as React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string | number;
}

export interface BottomNavProps {
  items: NavItem[];
  activeId?: string;
  onItemClick?: (item: NavItem) => void;
  className?: string;
}

/**
 * BottomNav - Mobile-first bottom navigation bar
 * Optimized for one-handed use with safe-area support
 */
export const BottomNav = React.forwardRef<HTMLElement, BottomNavProps>(
  ({ items, activeId, onItemClick, className = '' }, ref) => {
    return (
      <nav
        ref={ref}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 lg:hidden ${className}`}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center justify-around">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  <div className="w-6 h-6">{item.icon}</div>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center text-xs font-semibold text-white bg-error-DEFAULT rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }
);

BottomNav.displayName = 'BottomNav';

export interface SidebarNavProps {
  items: NavItem[];
  activeId?: string;
  onItemClick?: (item: NavItem) => void;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * SidebarNav - Desktop sidebar navigation
 * Hidden on mobile, visible on large screens
 */
export const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ items, activeId, onItemClick, className = '', header, footer }, ref) => {
    return (
      <nav
        ref={ref}
        className={`hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-40 bg-white border-r border-neutral-200 ${className}`}
      >
        {header && (
          <div className="flex-shrink-0 px-6 py-4 border-b border-neutral-200">
            {header}
          </div>
        )}
        <div className="flex-1 overflow-y-auto py-4">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600'
                    : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="w-5 h-5 mr-3">{item.icon}</div>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto min-w-[20px] h-5 px-2 flex items-center justify-center text-xs font-semibold text-white bg-error-DEFAULT rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {footer && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-neutral-200">
            {footer}
          </div>
        )}
      </nav>
    );
  }
);

SidebarNav.displayName = 'SidebarNav';

export interface MobileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

/**
 * MobileHeader - Fixed header for mobile views
 * With safe-area support for notched devices
 */
export const MobileHeader = React.forwardRef<HTMLElement, MobileHeaderProps>(
  ({ title, leftAction, rightAction, className = '', ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 lg:hidden ${className}`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
        }}
        {...props}
      >
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center min-w-0">
            {leftAction && <div className="mr-2">{leftAction}</div>}
            {title && (
              <h1 className="text-lg font-semibold text-neutral-900 truncate">
                {title}
              </h1>
            )}
          </div>
          {rightAction && <div className="ml-2">{rightAction}</div>}
        </div>
      </header>
    );
  }
);

MobileHeader.displayName = 'MobileHeader';
