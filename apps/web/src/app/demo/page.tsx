'use client';

import { useState } from 'react';
import {
  AppLayout,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  EmptyState,
  SkeletonCard,
  SkeletonList,
  type NavItem,
} from '@ourhaus/ui';

// Icon components (using SVG for demo)
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);

const TimelineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const DocumentsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon />, href: '/demo' },
  { id: 'timeline', label: 'Timeline', icon: <TimelineIcon />, href: '/demo/timeline', badge: 3 },
  { id: 'documents', label: 'Documents', icon: <DocumentsIcon />, href: '/demo/documents' },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon />, href: '/demo/settings' },
];

export default function DemoPage() {
  const [activeNav, setActiveNav] = useState('home');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavClick = (item: NavItem) => {
    setActiveNav(item.id);
    // Simulate loading when switching views
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <SkeletonCard hasImage lines={3} />
          <SkeletonList items={3} hasAvatar />
        </div>
      );
    }

    switch (activeNav) {
      case 'home':
        return (
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Welcome to OurHaus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  This is a demo of the mobile-first app shell with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                  <li>Bottom navigation on mobile (try resizing!)</li>
                  <li>Sidebar navigation on desktop (lg: breakpoint)</li>
                  <li>Safe-area support for notched devices</li>
                  <li>Smooth transitions between views</li>
                  <li>Skeleton loading states</li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle className="text-lg">📱 Mobile-First</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Optimized for one-handed use with bottom navigation and touch-friendly targets (44px min).</p>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle className="text-lg">🖥️ Desktop Ready</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Sidebar navigation with full layout support on larger screens.</p>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle className="text-lg">⚡ PWA Support</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Installable as a Progressive Web App with offline capabilities.</p>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle className="text-lg">🎨 Smooth UI</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Transitions, loading skeletons, and polished interactions.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <EmptyState
                  title="No timeline events yet"
                  description="Your home timeline will appear here. Start by documenting your first event."
                  icon={<TimelineIcon />}
                  action={<Button variant="primary">Add Event</Button>}
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <EmptyState
                  title="No documents yet"
                  description="Upload documents like receipts, warranties, and manuals to keep them organized."
                  icon={<DocumentsIcon />}
                  action={<Button variant="primary">Upload Document</Button>}
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="font-semibold text-neutral-900 mb-1">Account</h3>
                  <p className="text-sm text-neutral-600">Manage your account settings</p>
                </div>
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="font-semibold text-neutral-900 mb-1">Notifications</h3>
                  <p className="text-sm text-neutral-600">Configure notification preferences</p>
                </div>
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="font-semibold text-neutral-900 mb-1">Privacy</h3>
                  <p className="text-sm text-neutral-600">Control your privacy settings</p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">About</h3>
                  <p className="text-sm text-neutral-600">Version 0.1.0</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout
      navItems={navItems}
      activeNavId={activeNav}
      onNavItemClick={handleNavClick}
      mobileHeader={{
        title: navItems.find((item) => item.id === activeNav)?.label || 'OurHaus',
      }}
      sidebarHeader={
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
            OH
          </div>
          <h1 className="text-xl font-bold text-neutral-900">OurHaus</h1>
        </div>
      }
      sidebarFooter={
        <div className="text-xs text-neutral-500">
          <p>Version 0.1.0</p>
        </div>
      }
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </div>
    </AppLayout>
  );
}
