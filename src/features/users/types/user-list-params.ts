import type { UserRole } from "./user.types";

export const PAGE_SIZES = [10, 20, 30] as const;

export type PageSize = (typeof PAGE_SIZES)[number];

export const SORT_FIELDS = [
  "firstName",
  "age",
] as const;

export type UserSortField =
  (typeof SORT_FIELDS)[number];

export const SORT_ORDERS = [
  "asc",
  "desc",
] as const;

export type SortOrder =
  (typeof SORT_ORDERS)[number];

export interface UserListParams {
  page: number;
  pageSize: PageSize;

  q: string;

  role: UserRole | "all";

  sortBy: UserSortField;
  order: SortOrder;
}