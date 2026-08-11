import {
  PAGE_SIZES,
  SORT_FIELDS,
  SORT_ORDERS,
  type PageSize,
  type SortOrder,
  type UserListParams,
  type UserSortField,
} from "../types/user-list-params";

import type { UserRole } from "../types/user.types";

const USER_ROLES = [
  "admin",
  "moderator",
  "user",
] as const;

function parsePositiveInt(
  value: string | null,
  fallback: number
): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

function parsePageSize(
  value: string | null
): PageSize {
  const parsed = Number(value);

  return (
    PAGE_SIZES.find(
      (pageSize) => pageSize === parsed
    ) ?? PAGE_SIZES[0]
  );
}

function parseRole(
  value: string | null
): UserRole | "all" {
  if (value === "all") {
    return "all";
  }

  return (
    USER_ROLES.find(
      (role) => role === value
    ) ?? "all"
  );
}

function parseSortField(
  value: string | null
): UserSortField {
  return (
    SORT_FIELDS.find(
      (field) => field === value
    ) ?? "firstName"
  );
}

function parseSortOrder(
  value: string | null
): SortOrder {
  return (
    SORT_ORDERS.find(
      (order) => order === value
    ) ?? "asc"
  );
}

export function parseUserListParams(
  searchParams: URLSearchParams,
  defaultPageSize: PageSize = PAGE_SIZES[0]
): UserListParams {
  return {
    page: parsePositiveInt(
      searchParams.get("page"),
      1
    ),

    pageSize: searchParams.has("pageSize")
      ? parsePageSize(
          searchParams.get("pageSize")
        )
      : defaultPageSize,

    q: searchParams.get("q")?.trim() ?? "",

    role: parseRole(
      searchParams.get("role")
    ),

    sortBy: parseSortField(
      searchParams.get("sortBy")
    ),

    order: parseSortOrder(
      searchParams.get("order")
    ),
  };
}