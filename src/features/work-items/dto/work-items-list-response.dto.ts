import type { WorkItemResponseDto } from "./work-item-response.dto";

export interface WorkItemsListResponseDto {
  todos: WorkItemResponseDto[];

  total: number;

  skip: number;

  limit: number;
}