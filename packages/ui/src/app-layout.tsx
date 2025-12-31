/**
 * AppLayout Component
 * Complete app shell with responsive navigation and content area
 */

import * as React from 'react';
import {
  BottomNav,
  SidebarNav,
  MobileHeader,
  type NavItem,
} from './navigation';

export interface AppLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  activeNavId?: string;
  onNavItemClick?: (item: NavItem) => void;
  mobileHeader?: {
    title?: string;
    leftAction?: React.ReactNode;
    rightAction?: React.ReactNode;
  };
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  className?: string;
}

/**
 * AppLayout - Complete app shell with responsive navigation
 * - Mobile: Bottom navigation + optional top header
 * - Desktop: Sidebar navigation
 * - Handles safe-area insets for mobile devices
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  navItems,
  activeNavId,
  onNavItemClick,
  mobileHeader,
  sidebarHeader,
  sidebarFooter,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-background-secondary ${className}`}>
      {/* Mobile Header */}
      {mobileHeader && (
        <MobileHeader
          title={mobileHeader.title}
          leftAction={mobileHeader.leftAction}
          rightAction={mobileHeader.rightAction}
        />
      )}

      {/* Desktop Sidebar */}
      <SidebarNav
        items={navItems}
        activeId={activeNavId}
        onItemClick={onNavItemClick}
        header={sidebarHeader}
        footer={sidebarFooter}
      />

      {/* Main Content Area */}
      <main
        className={`
          lg:ml-64
          ${mobileHeader ? 'mt-14 lg:mt-0' : ''}
          pb-20 lg:pb-0
          min-h-screen
        `}
      >
        <div className="page-transition">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        items={navItems}
        activeId={activeNavId}
        onItemClick={onNavItemClick}
      />
    </div>
  );
};

AppLayout.displayName = 'AppLayout';
