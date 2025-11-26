// For offset pagination
export interface OffsetPaginationMeta {
  hasNext: boolean;
  hasPrevious: boolean;
  page: number;
  take: number;
  total: number;
}

// Queries for offset pagination
export interface OffsetPaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "DESC" | "ASC";
}

// For cursor pagination
export interface CursorPaginationMeta {
  hasMore: boolean;
  isFirstPage: boolean;
  nextCursor: number | null;
  prevCursor: number | null;
}

// Queries for cursor pagination
export interface CursorPaginationQueries {
  search?: string;
  cursor?: number;
  isPrevious?: boolean;
  take?: number;
}

export type PaginationQueries =
  | OffsetPaginationQueries
  | CursorPaginationQueries;

export interface PageableResponseOffset<T> {
  data: T[];
  meta: OffsetPaginationMeta;
}

export interface PageableResponseCursor<T> {
  data: T[];
  meta: CursorPaginationMeta;
}
