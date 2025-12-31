/**
 * Skeleton Components
 * Loading placeholders with smooth animations
 */

import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton - Base skeleton loader component
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      variant = 'rectangular',
      animation = 'pulse',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    };

    const animationClasses = {
      pulse: 'animate-pulse',
      wave: 'animate-shimmer',
      none: '',
    };

    return (
      <div
        ref={ref}
        className={`bg-neutral-200 ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

/**
 * SkeletonText - Multiple lines of text skeleton
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  );
};

SkeletonText.displayName = 'SkeletonText';

export interface SkeletonCardProps {
  hasImage?: boolean;
  hasAvatar?: boolean;
  lines?: number;
  className?: string;
}

/**
 * SkeletonCard - Card layout skeleton
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  hasImage = false,
  hasAvatar = false,
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`p-4 bg-white rounded-lg border border-neutral-200 ${className}`}>
      {hasImage && <Skeleton variant="rectangular" height={200} className="mb-4" />}
      <div className="space-y-3">
        {hasAvatar && (
          <div className="flex items-center space-x-3">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1">
              <Skeleton variant="text" height={16} width="40%" />
            </div>
          </div>
        )}
        <Skeleton variant="text" height={24} width="60%" />
        <SkeletonText lines={lines} />
      </div>
    </div>
  );
};

SkeletonCard.displayName = 'SkeletonCard';

export interface SkeletonListProps {
  items?: number;
  hasAvatar?: boolean;
  className?: string;
}

/**
 * SkeletonList - List layout skeleton
 */
export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 5,
  hasAvatar = false,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          {hasAvatar && <Skeleton variant="circular" width={48} height={48} />}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" height={16} width="70%" />
            <Skeleton variant="text" height={14} width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
};

SkeletonList.displayName = 'SkeletonList';

export interface SkeletonPageProps {
  hasHeader?: boolean;
  hasSidebar?: boolean;
  className?: string;
}

/**
 * SkeletonPage - Full page layout skeleton
 */
export const SkeletonPage: React.FC<SkeletonPageProps> = ({
  hasHeader = true,
  hasSidebar = false,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-background-secondary ${className}`}>
      {hasHeader && (
        <div className="bg-white border-b border-neutral-200 p-4">
          <Skeleton variant="text" height={32} width="30%" />
        </div>
      )}
      <div className="flex">
        {hasSidebar && (
          <div className="hidden lg:block w-64 p-4 bg-white border-r border-neutral-200 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="text" height={40} />
            ))}
          </div>
        )}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <SkeletonCard hasImage lines={4} />
            <SkeletonCard lines={3} />
            <SkeletonList items={3} hasAvatar />
          </div>
        </div>
      </div>
    </div>
  );
};

SkeletonPage.displayName = 'SkeletonPage';
