import type {
  WorkItemListParams,
  WorkItemStatus,
} from "../types/work-item-list-params";

const WORK_ITEM_STATUSES = [
  "all",
  "pending",
  "completed",
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

function parseStatus(
  value: string | null
): WorkItemStatus {
  return WORK_ITEM_STATUSES.find(
    (status) => status === value
  ) ?? "all";
}



export function parseWorkItemListParams(
  searchParams: URLSearchParams
): WorkItemListParams {
  const assigneeId = parsePositiveInt(
    searchParams.get("assigneeId"),
    0
  );

  return {
    page: parsePositiveInt(
      searchParams.get("page"),
      1
    ),

    pageSize: parsePositiveInt(
      searchParams.get("pageSize"),
      10
    ),

    search:
      searchParams.get("search")?.trim() ?? "",

    status: parseStatus(
      searchParams.get("status")
    ),

    ...(assigneeId > 0
      ? { assigneeId }
      : {}),
  };
}