/**
 * @ourhaus/shared - Shared TypeScript Types
 * Common types used across the OurHaus application
 */

/**
 * Base entity interface for domain objects
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
  meta?: Record<string, unknown>;
}

/**
 * Standardized API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * User-related types (placeholder for future implementation)
 */
export interface User extends BaseEntity {
  email: string;
  displayName?: string;
  photoURL?: string;
}

/**
 * Generic result type for operations that can fail
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
