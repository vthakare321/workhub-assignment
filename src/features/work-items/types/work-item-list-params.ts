export type WorkItemStatus =
  | "all"
  | "pending"
  | "completed";

export interface WorkItemListParams {
  page: number;
  pageSize: number;

  search: string;
  status: WorkItemStatus;

  assigneeId?: number;
}